package com.msc.controller;

import com.msc.mapper.PassageMapper;
import com.msc.mapper.UserMapper;
import com.msc.mapper.ViewTraceMapper;
import com.msc.pojo.Passage;
import com.msc.pojo.User;
import com.msc.pojo.ViewTrace;
import com.msc.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class TraceController {

    @Autowired
    ViewTraceMapper viewTraceMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    PassageMapper psgMapper;

    @PostMapping("/trace")
    public String insertTrace(@RequestBody HashMap<String, String> map){
        ViewTrace viewTrace = new ViewTrace(map.get("id"), map.get("userId"), map.get("psgId"), map.get("time"));
        this.viewTraceMapper.insertTrace(viewTrace);
        return ToolService.jsonPackage("massage", "文章浏览信息成功插入");
    }

    @GetMapping("/trace/user/{id}")
    public List<Passage> getRecentPsgs(@PathVariable String id){
        List<ViewTrace> viewTraces = this.viewTraceMapper.getByUserId(id);
        List<Passage> psgs = new ArrayList<>();
        for(ViewTrace viewTrace: viewTraces){
            if(psgs.size() >= 100) break;
            psgs.add(this.psgMapper.getPassageById(viewTrace.getPsgId()));
        }
        return psgs;
    }

    @GetMapping("/trace/psg/{id}")
    public List<User> getRecentViewer(@PathVariable String id){
        List<ViewTrace> viewTraces = this.viewTraceMapper.getByPsgId(id);
        List<User> users = new ArrayList<>();
        for(ViewTrace viewTrace: viewTraces){
            if(users.size() >= 100) break;
            users.add(userMapper.getUserById(viewTrace.getUserId()));
        }
        return users;
    }
}
