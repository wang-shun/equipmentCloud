package com.yankuang.equipment.web.restful;

import com.github.pagehelper.PageInfo;
import com.yankuang.equipment.common.util.CommonResponse;
import com.yankuang.equipment.common.util.JsonUtils;
import com.yankuang.equipment.common.util.StringUtils;
import com.yankuang.equipment.equipment.model.DtkList;
import com.yankuang.equipment.equipment.model.ListZReport;
import com.yankuang.equipment.equipment.model.ListZReportItem;
import com.yankuang.equipment.equipment.service.ElUseItemService;
import com.yankuang.equipment.equipment.service.SbElFeeService;
import com.yankuang.equipment.equipment.service.ZEquipmentReportService;
import com.yankuang.equipment.web.dto.UserDTO;
import com.yankuang.equipment.web.dto.ZEquipmentDTO;
import com.yankuang.equipment.web.util.DateConverterConfig;
import com.yankuang.equipment.web.util.UserFromRedis;
import io.terminus.boot.rpc.common.annotation.RpcConsumer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/v1/report")
public class ZEquipmentReportController {

    @RpcConsumer
    ElUseItemService elUseItemService;

    @RpcConsumer
    ZEquipmentReportService zEquipmentReportService;

    @RpcConsumer
    SbElFeeService sbElFeeService;

    @Autowired
    UserFromRedis userFromRedis;

    /**
     * @method 查询报表列表
     * @param page
     * @param size
     * @param jsonString
     * @return
     */
    @GetMapping
    public CommonResponse ZReportSelect(@RequestParam Integer page,
                                        @RequestParam Integer size,
                                        @RequestParam String jsonString) throws ParseException {

        Long day;
        Double sum = 0.0;

        if (StringUtils.isEmpty(jsonString)){
            return CommonResponse.build(500,"返回对象不能为空",null);
        }
        DtkList dtkList = JsonUtils.jsonToPojo(jsonString,DtkList.class);

        if (dtkList.getUseYear() == null || "".equals(dtkList.getUseYear())) {
            return CommonResponse.build(500,"领用年份不能为空",null);
        }

        if ( dtkList.getUseMonth() == null && "".equals(dtkList.getUseMonth())){
            return CommonResponse.build(500,"领用月份不能为空",null);
        }
        dtkList.setCenterYear(Integer.parseInt(dtkList.getUseYear()));
        dtkList.setCenterMonth(Integer.parseInt(dtkList.getUseMonth()));
        //判断是否是查询历史记录报表
        if (zEquipmentReportService.find(dtkList)){
            ZEquipmentDTO zEquipmentDTO = new ZEquipmentDTO();
            zEquipmentDTO.setUseYear(dtkList.getUseYear());
            zEquipmentDTO.setUseMonth(dtkList.getUseMonth());
            zEquipmentDTO.setEquipmentPosition(dtkList.getEquipmentEffect());
            zEquipmentDTO.setUseDeptCode(dtkList.getDeptCode());
            return CommonResponse.ok(findByPage(page,size,zEquipmentDTO));
        }

        //获取满足条件的领用记录
        List<DtkList> dtkListLYs = elUseItemService.findReportLY(dtkList);
        //获取计费时间段，用来传参
        Date date = new Date();
        Calendar chargingDate = Calendar.getInstance();
        chargingDate.setTime(date);
        int month = chargingDate.get(Calendar.MONTH)+1;
        int year = chargingDate.get(Calendar.YEAR);

        Date endDate = new SimpleDateFormat("yyyy-M-dd").parse( year + "-" + month + "-20" );
        Date startDate = new SimpleDateFormat("yyyy-M-dd").parse(year + "-" + (month -1) + "-21");
        // 循环获取
        for (DtkList dtkListLY:dtkListLYs){
            Double isNew = sbElFeeService.CalDayElFeeA3Z_rate(dtkListLY.getUseId(),dtkListLY.getEquipmentId());
            //判断是否是新设备
            if (isNew > 1){
                dtkListLY.setIsNew((byte)1);
            }else {
                dtkListLY.setIsNew((byte)2);
            }
            if (dtkListLY.getSign() == null || "".equals(dtkListLY)){
               day = sbElFeeService.CalEquipmentElDays(dtkListLY.getUseId(),null,dtkListLY.getEquipmentId(),startDate,endDate);
               //获取收费期限
               dtkListLY.setFeeDay(new SimpleDateFormat("yyyy-MM-dd").format(dtkListLY.getUseAt())+"下");
            }else {
                dtkListLY.setStartDate(startDate);
                DtkList findSign = elUseItemService.findSign(dtkListLY);
                if (findSign == null){
                    continue;
                }
                //获取收费期限
                dtkListLY.setFeeDay(new SimpleDateFormat("yyyy-MM-dd").format(dtkListLY.getUseAt())+"-"+new SimpleDateFormat("yyyy-MM-dd").format(findSign.getUseAt()));
               day = sbElFeeService.CalEquipmentElDays(dtkListLY.getUseId(),findSign.getUseId(),dtkListLY.getEquipmentId(),startDate,endDate);
            }

            if (dtkListLY.getCostA1() == null){
                return CommonResponse.build(500,"没有日租赁费",null);
            }
            if (dtkListLY.getEquipmentNum() == null){
                return CommonResponse.build(500,"没有设备数量",null);
            }
            Double costA1Fee = dtkListLY.getCostA1() * dtkListLY.getEquipmentNum() * day;
            sum += costA1Fee;
            dtkListLY.setCostA1Fee(costA1Fee);
            dtkListLY.setSum(costA1Fee);
            dtkListLY.setDay(day);
            dtkList.setUseAt(dtkListLY.getUseAt());
        }

        dtkList.setSum(sum);

        PageInfo pageInfo = elUseItemService.dtkReportPage(page,size,dtkListLYs);
        Map elUseItemMap = new HashMap();
        elUseItemMap.put("pageInfo",pageInfo);
        if (elUseItemService.findKB(dtkList)) {
            dtkList.setKb((byte) 1);
        } else {
            dtkList.setKb((byte) 2);
        }
        elUseItemMap.put("dtkList",dtkList);

        return CommonResponse.ok(elUseItemMap);
    }

    /**
     * 在导出时向数据库中存入数据
     * @param jsonString
     * @return
     */
    @PostMapping
    public CommonResponse ZReportCreate(@RequestBody String jsonString){
        if (StringUtils.isEmpty(jsonString)){
            return CommonResponse.build(500,"传入参数不能为空！",null);
        }

        ZEquipmentDTO zEquipmentDTO = JsonUtils.jsonToPojo(jsonString,ZEquipmentDTO.class);
        if (zEquipmentDTO == null){
            return CommonResponse.build(500,"参数不能为空",null);
        }
        if (zEquipmentDTO.getUseDeptName() == null || "".equals(zEquipmentDTO.getUseDeptName())) {
            return CommonResponse.build(500, "部门名称不能为空！", null);
        }

        if (zEquipmentDTO.getNumber() == null || "".equals(zEquipmentDTO.getNumber())) {
            return CommonResponse.build(500, "编号不能为空！", null);
        }

        if (zEquipmentDTO.getUseAtString() != null && "".equals(zEquipmentDTO.getUseAtString())){
            DateConverterConfig dateConverterConfig = new DateConverterConfig();
            Date useAt = dateConverterConfig.convert(zEquipmentDTO.getUseAtString());
            if (useAt != null ){
                zEquipmentDTO.setUseAt(useAt);
            }
        }

        List<ListZReportItem> ListZReportItems = zEquipmentDTO.getListZReportItems();

        //判断清单列表是否有数据
        if (ListZReportItems == null || ListZReportItems.size() <= 0) {
            return CommonResponse.build(200, "报表没有数据", null);
        }
        ListZReport listZReport = new ListZReport();
        //实体类属性数据转换到dto中
        BeanUtils.copyProperties(zEquipmentDTO,listZReport);
        if (zEquipmentReportService.create(listZReport,ListZReportItems)) {
            return CommonResponse.ok("创建成功");
        }
        return CommonResponse.build(500,"创建失败",null);
    }

    /**
     * 分页查询报表历史
     * @param page
     * @param size
     * @param zEquipmentDTO
     * @return
     */
    public Map findByPage(Integer page,
                                        Integer size,
                                        ZEquipmentDTO zEquipmentDTO) {

        DtkList dtkList = new DtkList();

        String useAtString = zEquipmentDTO.getUseAtString();
        if (useAtString != null && !"".equals(useAtString)){
            DateConverterConfig dateConverterConfig = new DateConverterConfig();
            Date date = dateConverterConfig.convert(useAtString);
            zEquipmentDTO.setUseAt(date);
        }
        BeanUtils.copyProperties(zEquipmentDTO,dtkList);
        return zEquipmentReportService.findByPage(page,size,dtkList);
    }

}
