package com.yankuang.equipment.equipment.mapper;

import com.yankuang.equipment.equipment.model.SbModel;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SbModelMapper {
    int deleteById(Long id);

    int deletes(@Param("ids") List<Long> ids);

    int create(SbModel record);

    SbModel findById(Long id);

    int update(SbModel record);

    List<SbModel> list(@Param("p_code") String code,@Param("p_name") String name);

    SbModel selectByMaxId(@Param("sbtypeThree") String sbtypeThree);

    List<SbModel> listBySbtypeThree(@Param("sbtypeThree") String sbtypeThree,
                                    @Param("sbtypeTwo") String sbtypeTwo);

}