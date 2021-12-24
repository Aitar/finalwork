package com.msc.controller;

import com.msc.mapper.CollectMapper;
import com.msc.mapper.PassageMapper;
import com.msc.mapper.UserMapper;
import com.msc.pojo.CollectMap;
import com.msc.pojo.Passage;
import com.msc.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class CollectController {

    @Autowired
    CollectMapper collectMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    PassageMapper passageMapper;

    /**
     * 根据用户id获取其收藏的文章列表
     * @param uid 用户id
     * @return 文章列表
     */
    @GetMapping("/collect/{uid}")
    public List<Passage> getPsgByCollect(@PathVariable String uid){
        List<CollectMap> collectMaps = this.collectMapper.getCollectMapByUserId(uid);
        List<Passage> passages = new ArrayList<>();
        for(CollectMap c: collectMaps){
            passages.add(this.passageMapper.getPassageById(c.getPid()));
        }
        return passages;
    }

    @PostMapping("/collect/is")
    public String isCollected(@RequestBody HashMap<String, String> map){
        //此处若抛出异常说明文章没有被用户收藏
        return ToolService.jsonPackage("massage", this.collectMapper.getCollectMapByTwo(map.get("uid"), map.get("pid")).getId());
    }

    @PostMapping("/collect")
    public String insertCollect(@RequestBody HashMap<String, String> map){
        this.collectMapper.insertCollect(new CollectMap(map.get("id"), map.get("uid"), map.get("pid")));
        return ToolService.jsonPackage("massage", "成功插入一条收藏信息");
    }

    @PostMapping("/collect/deleteByTwo")
    public String delectByTwo(@RequestBody HashMap<String, String> map){
        this.collectMapper.delectByTwo(map.get("uid"), map.get("pid"));
        return ToolService.jsonPackage("massage", "成功取消收藏");
    }

    @DeleteMapping("/collect/{id}")
    public String delectCollect(@PathVariable String id){
        this.collectMapper.deleteCollectById(id);
        return ToolService.jsonPackage("massage", "成功删除一条收藏信息" + id);
    }
}
