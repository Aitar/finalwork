package com.msc.controller;

import com.msc.mapper.FlwCommentMapper;
import com.msc.pojo.FlwComment;
import com.msc.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
public class FlwComController {

    @Autowired
    FlwCommentMapper flwCommentMapper;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 获取所有的跟评
     * @return 跟评列表
     */
    @GetMapping("/flwComment")
    public List<FlwComment> getAll(){
        return this.flwCommentMapper.getFlwComments();
    }

    /**
     * 根据评论的id获取其跟评列表
     * @param comId 评论id
     * @return 跟评列表
     */
    @GetMapping("/flwComment/com/{comId}")
    public List<FlwComment> getFlwComByComId(@PathVariable String comId){
        return this.flwCommentMapper.getFlwComByTarCom(comId);
    }

    /**
     * 根据用户id获取其跟评列表
     * @param userId 用户id
     * @return 跟评列表
     */
    @GetMapping("/flwComment/owner/{userId}")
    public List<FlwComment> getFlwComByOwner(@PathVariable String userId){
        return this.flwCommentMapper.getFlwComByOwner(userId);
    }

    /**
     * 插入一条跟评
     * @param map 请求体
     * @return 成功信息
     */
    @PostMapping("/flwComment")
    public String insertFlwComment(@RequestBody HashMap<String, String> map){
        this.flwCommentMapper.insertFlwComment(
                new FlwComment(map.get("id"), map.get("owner"), map.get("tarComment"), map.get("content"), sdf.format(new Date()), Integer.parseInt(map.get("hotIndex"))));
        return ToolService.jsonPackage("massage", "成功插入一条跟评" + map.get("id"));
    }

    /**
     * 删除一条跟评
     * @param id 跟评id
     * @return 成功删除信息
     */
    @DeleteMapping("/flwComment/{id}")
    public String deleteFlwComment(@PathVariable String id){
        this.flwCommentMapper.deleteFlwComment(id);
        return ToolService.jsonPackage("massage", "成功删除跟评" + id);
    }
}
