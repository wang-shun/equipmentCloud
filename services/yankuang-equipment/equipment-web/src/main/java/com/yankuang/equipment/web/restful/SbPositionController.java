package com.yankuang.equipment.web.restful;

import com.github.pagehelper.PageInfo;
import com.google.common.primitives.Longs;
import com.yankuang.equipment.common.util.Constants;
import com.yankuang.equipment.common.util.ResponseMeta;
import com.yankuang.equipment.equipment.model.SbPosition;
import com.yankuang.equipment.equipment.service.SbPositionService;
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
@RequestMapping("/v1/sbposition")
public class SbPositionController {

    Logger logger = LoggerFactory.getLogger(SbPositionController.class);

    @RpcConsumer
    SbPositionService sbPositionService;

    @Autowired
    UserFromRedis userFromRedis;

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public ResponseMeta create(@Valid @RequestBody SbPosition sbPosition, BindingResult bindingResult){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            if (bindingResult.hasErrors()){
                return responseMeta.setMeta(Constants.RESPONSE_ERROR,bindingResult.getAllErrors().get(0).getDefaultMessage());
            }
            sbPosition.setCreateBy(userFromRedis.findByToken().getCode());
            sbPositionService.create(sbPosition);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"创建设备位置成功");
        }catch (Exception e){
            logger.info("创建设备位置失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"创建设备位置失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    public ResponseMeta update(@Valid @RequestBody SbPosition sbPosition, BindingResult bindingResult){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            if (bindingResult.hasErrors()){
                return responseMeta.setMeta(Constants.RESPONSE_ERROR,bindingResult.getAllErrors().get(0).getDefaultMessage());
            }
            sbPosition.setUpdateBy(userFromRedis.findByToken().getCode());
            sbPositionService.update(sbPosition);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"更新设备位置成功");
        }catch (Exception e){
            logger.info("更新设备位置失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"更新设备位置失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/find/{id}",method = RequestMethod.GET)
    public ResponseMeta findById(@PathVariable("id") Long id){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            SbPosition sbPosition = sbPositionService.findById(id);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"查询设备位置信息成功!");
            responseMeta.setData(sbPosition);
        }catch (Exception e){
            logger.info("查询设备位置失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"查询设备位置信息失败!");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public ResponseMeta deleteById(@PathVariable("id") Long id){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            sbPositionService.deleteById(id);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"删除设备位置信息成功");
        }catch (Exception e){
            logger.info("删除设备位置失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"删除设备位置信息失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public ResponseMeta list(SbPosition sbPosition,int pageNum,int pageSize){
        ResponseMeta responseMeta = new ResponseMeta();
        try{
            PageInfo<SbPosition> list = sbPositionService.list(sbPosition,pageNum,pageSize);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"查询设备功能位置列表成功");
            responseMeta.setData(list);
        }catch (Exception e){
            logger.info("查询设备功能位置列表失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"查询设备功能位置列表失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }

    @RequestMapping(value = "/deletes/{id}",method = RequestMethod.DELETE)
    public ResponseMeta deletes(@PathVariable("id") long[] id){
        ResponseMeta responseMeta = new ResponseMeta();
        List<Long> ids = Longs.asList(id);
        try{
            sbPositionService.deletes(ids);
            responseMeta.setMeta(Constants.RESPONSE_SUCCESS,"删除设备功能位置信息成功");
        }catch (Exception e){
            logger.info("删除设备功能位置列表失败:"+ExceptionUtils.getStackTrace(e));
            responseMeta.setMeta(Constants.RESPONSE_EXCEPTION,"删除设备功能位置信息失败");
            responseMeta.setData(ExceptionUtils.getStackTrace(e));
        }
        return responseMeta;
    }
}
