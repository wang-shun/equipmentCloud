package com.yankuang.equipment.equipment.mapper;

import com.yankuang.equipment.equipment.model.ReportEquipmentZMonthItem;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportEquipmentZMonthItemMapper {

    int insert(ReportEquipmentZMonthItem record);

    int update(ReportEquipmentZMonthItem record);

    int updateYearPlanValById(ReportEquipmentZMonthItem reportEquipmentZMonthItem);

    List<ReportEquipmentZMonthItem> list(ReportEquipmentZMonthItem record);

    List<ReportEquipmentZMonthItem> listByExportId(@Param("exportId") Long exportId,@Param("deptType") String deptType);

    List<ReportEquipmentZMonthItem> sumByExportId(@Param("exportId") Long exportId,@Param("deptType") String deptType);
}