package com.yankuang.equipment.web.restful;

import com.yankuang.equipment.common.util.CommonResponse;
import com.yankuang.equipment.common.util.JsonUtils;
import com.yankuang.equipment.common.util.StringUtils;
import com.yankuang.equipment.equipment.model.ZNewReport;
import com.yankuang.equipment.equipment.service.ZNewReportService;
import com.yankuang.equipment.web.dto.ZNewReportDTO;
import io.terminus.boot.rpc.common.annotation.RpcConsumer;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author boms
 */
@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/v1/newReport")
public class ZNewEquipmentReportController {

    @RpcConsumer
    ZNewReportService zNewReportService;

    /**
     * 保存新设备
     * @param jsonString
     * @return
     */
    @PostMapping
    public CommonResponse ZNewReportCreate(@RequestBody String jsonString) {

        if (StringUtils.isEmpty(jsonString)){
            return CommonResponse.build(500,"传入参数不能为空",null);
        }

        ZNewReportDTO zNewReportDTO = JsonUtils.jsonToPojo(jsonString,ZNewReportDTO.class);
        if (zNewReportDTO == null){
            return CommonResponse.build(500,"获取参数为空",null);
        }
        List<ZNewReport> zNewReports = zNewReportDTO.getzNewReports();

        for (ZNewReport zNewReport:zNewReports) {
            if (zNewReport == null) {
                return CommonResponse.build(500, "传入对象为空", null);
            }

            if (zNewReport.getUseDeptCode() == null || "".equals(zNewReport.getUseDeptCode())) {
                return CommonResponse.build(500, "使用单位Code不能为空", null);
            }

            if (zNewReport.getUseMonth() == null || "".equals(zNewReport.getUseDeptName())) {
                return CommonResponse.build(500, "领用月份不能为空", null);
            }

            if (zNewReport.getUseYear() == null || "".equals(zNewReport.getUseYear())) {
                return CommonResponse.build(500, "领用年份不能为空", null);
            }

            if (zNewReport.getUseDeptName() == null || "".equals(zNewReport.getUseDeptName())) {
                return CommonResponse.build(500, "传入单位不能为空", null);
            }

            if (!zNewReportService.create(zNewReport)){
                return CommonResponse.build(500,"创建失败",null);
            }
        }

        return CommonResponse.ok();
    }

    /**
     * 查询设备新度清单
     * @param page
     * @param size
     * @param jsonString
     * @return
     */
    @GetMapping
    public CommonResponse ZNewReportList(@RequestParam Integer page,
                                         @RequestParam Integer size,
                                         @RequestParam String jsonString){
        if (StringUtils.isEmpty(jsonString)){
            return CommonResponse.build(500,"传入参数不能为空",null);
        }

        ZNewReport zNewReport = JsonUtils.jsonToPojo(jsonString,ZNewReport.class);

        if (zNewReport == null){
            return CommonResponse.build(500,"传入对象为空",null);
        }

        if (zNewReport.getUseDeptCode() == null || "".equals(zNewReport.getUseDeptCode())){
            return CommonResponse.build(500,"使用单位Code不能为空",null);
        }

        if (zNewReport.getUseMonth() == null || "".equals(zNewReport.getUseMonth())){
            return CommonResponse.build(500,"领用月份不能为空",null);
        }

        if (zNewReport.getUseYear() == null || "".equals(zNewReport.getUseYear())){
            return CommonResponse.build(500,"领用年份不能为空",null);
        }

        if (zNewReport.getUseDeptName() == null || "".equals(zNewReport.getUseDeptName())){
            return CommonResponse.build(500,"传入单位不能为空",null);
        }

        if (zNewReportService.list(page,size,zNewReport) != null){
            return CommonResponse.ok(zNewReportService.list(page,size,zNewReport));
        }

        return CommonResponse.ok(zNewReportService.select(page,size,zNewReport));
    }
}
