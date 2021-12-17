package com.msc.controller;

import com.msc.mapper.LikeMapper;
import com.msc.pojo.LikeMap;
import com.msc.service.PassageService;
import com.msc.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class LikeController {

    @Autowired
    LikeMapper likeMapper;

    @Autowired
    PassageService passageService;

    /**
     * 根据用户id获取用户的点赞
     * @param userId 用户id
     * @return 已点赞的文章列表
     */
    @GetMapping("/like/user/{userId}")
    public List<LikeMap> getLikeMapByUserId(@PathVariable String userId){
        return this.likeMapper.getLikeMapByUserId(userId);
    }

    /**
     * 根据文章id获取文章当前文章的点赞列表
     * @param psgId 文章id
     * @return 点赞文章的用户
     */
    @GetMapping("/like/psg/{psgId}")
    public List<LikeMap> getLikeMapByPsgId(@PathVariable String psgId){
        return this.likeMapper.getLikeMapByPsgId(psgId);
    }

    /**
     * 插入一条点赞信息
     * @param map 请求体
     * @return 成功插入信息
     */
    @PostMapping("/like")
    public String insertLikeMap(@RequestBody HashMap<String, String> map){
        this.likeMapper.insertLikeMap(new LikeMap(map.get("id"), map.get("uid"), map.get("pid")));
        passageService.incrLiked(map.get("pid"));
        return ToolService.jsonPackage("massage", "成功点赞");
    }

    /**
     * 通过id删除一条点赞信息（取消点赞）
     * @param id 删除点赞信息的id
     * @return 成功删除的信息
     */
    @DeleteMapping("/like/{id}")
    public String deleteLikeMap(@PathVariable String id){
        String psgId = this.likeMapper.getLikeMapById(id).getPid();
        this.likeMapper.deleteLikeMap(id);
        passageService.decrLiked(psgId);
        return ToolService.jsonPackage("massage", "成功删除点赞映射");
    }
}
