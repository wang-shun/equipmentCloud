package com.yankuang.equipment.equipment.mapper;

import com.yankuang.equipment.equipment.model.ZjSbUseItem;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ZjSbUseItemMapper {

    List<ZjSbUseItem> listEquipmentReceipt(Map zjSbUseItem);

    List<ZjSbUseItem> list(Map zjSbUseItem);

    Integer create(ZjSbUseItem zjSbUseItem);

    Integer historyItems(@Param("useAt")String useAt,@Param("receiptId") Long receiptId);

}
