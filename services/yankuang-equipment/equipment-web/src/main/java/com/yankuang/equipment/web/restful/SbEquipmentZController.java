package com.yankuang.equipment.web.restful;

import com.github.pagehelper.PageInfo;
import com.google.common.primitives.Longs;
import com.yankuang.equipment.common.util.Constants;
import com.yankuang.equipment.common.util.ResponseMeta;
import com.yankuang.equipment.equipment.model.SbEquipmentZ;
import com.yankuang.equipment.equipment.service.SbEquipmentZService;
import com.yankuang.equipment.web.util.UserFromRedis;
import io.terminus.boot.rpc.common.annotation.RpcConsumer;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping(value = "/v1/sbequipmentz")
public class SbEquipmentZController {

    Logger logger = LoggerFactory.getLogger(SbModelController.class);

    @RpcConsumer
    SbEquipmentZService sbEquipmentZService;

    @Autowired
    UserFromRedis userFromRedis;

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public ResponseMeta create(@Valid @RequestBody SbEquipmentZ sbEquipmentZ, BindingResult bindingResult){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            if (bindingResult.hasErrors()){
                return responseMeta.setMeta(Constants.RESPONSE_ERROR,bindingResult.getAllErrors().get(0).getDefaultMessage());
            }
            SbEquipmentZ equipmentZ = sbEquipmentZService.findByCode(sbEquipmentZ.getCode());
            if(equipmentZ!=null){
                return responseMeta.setMeta(Constants.RESPONSE_ERROR,"设备识别码已存在!");
            }
            sbEquipmentZ.setCreateBy(userFromRedis.findByToken().getCode());
            sbEquipmentZService.create(sbEquipmentZ);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"创建综机设备成功");
        }catch (Exception e){
            logger.info("创建综机设备失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"创建综机设备失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    public ResponseMeta update(@Valid @RequestBody SbEquipmentZ sbEquipmentZ, BindingResult bindingResult){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            if (bindingResult.hasErrors()){
                return responseMeta.setMeta(Constants.RESPONSE_ERROR,bindingResult.getAllErrors().get(0).getDefaultMessage());
            }
            sbEquipmentZ.setUpdateBy(userFromRedis.findByToken().getCode());
            sbEquipmentZService.update(sbEquipmentZ);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"更新综机设备成功");
        }catch (Exception e){
            logger.info("更新综机设备失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"更新综机设备失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/find/{id}",method = RequestMethod.GET)
    public ResponseMeta findById(@PathVariable("id") Long id){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            SbEquipmentZ sbEquipmentZ = sbEquipmentZService.findById(id);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"编辑综机设备信息成功");
            responseMeta.setData(sbEquipmentZ);
        }catch (Exception e){
            logger.info("编辑综机设备失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"编辑综机设备信息失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public ResponseMeta deleteById(@PathVariable("id") Long id){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            sbEquipmentZService.deleteById(id);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"删除综机设备信息成功");
        }catch (Exception e){
            logger.info("删除综机设备失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"删除综机设备信息失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public ResponseMeta list(SbEquipmentZ sbEquipmentZ,int pageNum,int pageSize){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            PageInfo<SbEquipmentZ> pageInfo = sbEquipmentZService.list(sbEquipmentZ,pageNum,pageSize);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"查询综机设备列表成功");
            responseMeta.setData(pageInfo);
        }catch (Exception e){
            logger.info("查询综机设备失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"查询综机设备列表失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/deletes/{id}",method = RequestMethod.DELETE)
    public ResponseMeta deletes(@PathVariable("id") long[] id){
        ResponseMeta responseMeta = new ResponseMeta();
        List<Long> ids = Longs.asList(id);
        try{
            sbEquipmentZService.deletes(ids);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"删除综机设备信息成功");
        }catch (Exception e){
            logger.info("删除综机设备失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"删除综机设备信息失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }
}
