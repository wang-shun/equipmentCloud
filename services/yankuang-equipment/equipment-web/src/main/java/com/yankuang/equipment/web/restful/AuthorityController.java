package com.yankuang.equipment.web.restful;

import com.github.pagehelper.PageInfo;
import com.yankuang.equipment.authority.model.Authority;
import com.yankuang.equipment.authority.service.AuthorityService;
import com.yankuang.equipment.authority.service.CodeService;
import com.yankuang.equipment.authority.service.RoleAuthorityService;
import com.yankuang.equipment.common.util.CommonResponse;
import com.yankuang.equipment.common.util.JsonUtils;
import com.yankuang.equipment.web.dto.AuthorityTreeDTO;
import com.yankuang.equipment.web.dto.CodesDTO;
import com.yankuang.equipment.web.util.AuthorityTreeUtils;
import com.yankuang.equipment.web.util.CodeUtil;
import com.yankuang.equipment.web.util.UserFromRedis;
import io.terminus.boot.rpc.common.annotation.RpcConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/v1/acls")
public class AuthorityController {

    @Autowired
    UserFromRedis userFromRedis;

    @RpcConsumer
    AuthorityService authorityService;

    @RpcConsumer
    CodeService codeService;

    /**
     * 获取数据库id最大值生成.
     * @return
     */
    private String getCode() {

        Map map = new HashMap();
        map.put("tableName", "el_authority");
        Long idMax = codeService.findIdMax(map);
        idMax += 1 ;
        String code = CodeUtil.getFixedLengthCode(idMax.toString(),4);
        return code;

    }

    /**
     * 添加权限.
     * type=1 添加权限菜单
     * rype=2 添加权限按钮
     *
     * @param authority
     * @return
     */
    @PostMapping
    @Transactional
    public CommonResponse create(@RequestBody Authority authority) {
        String name = authority.getName();
        if (StringUtils.isEmpty(name)) {
            return CommonResponse.errorTokenMsg("权限name不能为空");
        }
        Long type = authority.getType();
        if (StringUtils.isEmpty(type)) {
            return CommonResponse.errorTokenMsg("权限type类型不能为空");
        }
        String pcode = authority.getPcode();
        if (StringUtils.isEmpty(pcode)) {
            return CommonResponse.errorTokenMsg("权限pcode不能为空");
        }
        Long sorting = authority.getSorting();
        if (StringUtils.isEmpty(sorting)) {
            return CommonResponse.errorTokenMsg("权限sorting不能为空");
        }
        // 根据权限名和pcode称查重
        Map map = new HashMap();
        map.put("name", name);
        map.put("pcode", pcode);
        Authority au = authorityService.findByNameAndPcode(map);
        // 不存在 ，添加权限
        if (StringUtils.isEmpty(au)) {
            authority.setCode(getCode());
            // todo redis中获得
            String loginerName = userFromRedis.findByToken().getName();
            authority.setCreateBy(loginerName);
            authority.setUpdateBy(loginerName);
            authority.setProjectCode("sb001");
            //添加权限
            Boolean b = authorityService.create(authority);
            if (!b) {
                return CommonResponse.errorMsg("权限添加失败");
            }
            return CommonResponse.build(200, "权限添加成功", null);
        }
        // 存在
        return CommonResponse.build(200, "权限已存在，请勿重复添加", null);
    }

    /**
     * 根据codes删除权限，单个或批量
     *
     * @param jsonString
     * @return
     */
    @DeleteMapping
    public CommonResponse delete(@RequestBody String jsonString) {
        if (StringUtils.isEmpty(jsonString)) {
            return CommonResponse.errorMsg("请选择要删除的数据");
        }
        CodesDTO codesDTO = JsonUtils.jsonToPojo(jsonString, CodesDTO.class);
        List<String> codes = codesDTO.getCodes();
        // 删除权限
        Boolean b  = authorityService.delete(codes);
        if (!b) {
            return CommonResponse.errorMsg("删除失败");
        }
        return CommonResponse.ok("删除成功");
    }

    /**
     * 根据code修改.
     *
     * @param jsonString
     * @return
     */
    @PutMapping
    public CommonResponse update(@RequestBody String jsonString) {

        if (StringUtils.isEmpty(jsonString)) {
            return CommonResponse.errorTokenMsg("参数不能为空");
        }
        Authority authority = JsonUtils.jsonToPojo(jsonString, Authority.class);
        if (StringUtils.isEmpty(authority.getCode())) {
            return CommonResponse.errorTokenMsg("权限code不能为空");
        }
        String loginerName = userFromRedis.findByToken().getName();
        authority.setUpdateBy(loginerName);
        Boolean b = authorityService.update(authority);
        if (b) {
            return CommonResponse.build(200, "更新成功", null);
        }
        return CommonResponse.errorMsg("更新失败");
    }

    /**
     * 通过code查询.
     *
     * @param code
     * @return
     */
    @GetMapping(value = "/{code}")
    public CommonResponse findByCode(@PathVariable String code) {
        if (StringUtils.isEmpty(code)) {
            return CommonResponse.errorTokenMsg("code不能为空");
        }
        return CommonResponse.ok(authorityService.findByCode(code));
    }

    /**
     * @return
     * @method 查询权限树
     * type=1 菜单
     */
    @GetMapping(value = "/tree")
    public CommonResponse findAll() {

        List<Authority> authorities = authorityService.findAll();
        List<AuthorityTreeDTO> trees = new ArrayList<>();
        AuthorityTreeDTO tree = null;
        for (Authority authority : authorities) {
            tree = new AuthorityTreeDTO();
            tree.setCode(authority.getCode());
            tree.setPcode(authority.getPcode());
            tree.setName(authority.getName());
            tree.setUrl(authority.getUrl());
            tree.setType(authority.getType());
            tree.setLevel(authority.getLevel());
            tree.setSorting(authority.getSorting());
            tree.setIcon(authority.getIcon());
            tree.setCreateAt(authority.getCreateAt());
            tree.setRemark(authority.getRemark());
            trees.add(tree);
        }
        AuthorityTreeUtils treeUtils = new AuthorityTreeUtils();
        List<AuthorityTreeDTO> list = treeUtils.menuList(trees);
        return CommonResponse.ok(list);
    }

    /**
     * 权限分页查询.
     *
     * @param page
     * @param size
     * @param name
     * @return
     */
    @GetMapping
    public CommonResponse findByPage(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                     @RequestParam(value = "size", defaultValue = "20") Integer size,
                                     @RequestParam String name) {
        Map map = new HashMap();
        map.put("name", name);
        PageInfo<Authority> authorityPageInfo = authorityService.findByPage(page, size, map);
        return CommonResponse.ok(authorityPageInfo);
    }

}
