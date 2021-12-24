package com.msc.controller;

import com.msc.mapper.PassageMapper;
import com.msc.mapper.UserMapper;
import com.msc.pojo.Passage;
import com.msc.pojo.User;
import com.msc.service.PassageService;
import com.msc.service.ToolService;
import com.msc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
public class PassageCotroller {
    @Autowired
    PassageMapper passageMapper;

    @Autowired
    UserService userService;

    @Autowired
    UserMapper userMapper;

    @Autowired
    PassageService passageService;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @GetMapping("/psgs")
    public List<Passage> getAllPsgs(){
        return this.passageMapper.getPassages();
    }

    @GetMapping("/psg/{id}")
    public Passage getPsgById(@PathVariable String id){
        return this.passageMapper.getPassageById(id);
    }

    @GetMapping("/psg/user/{id}")
    public List<Passage> getPsgByUId(@PathVariable String id){
        return this.passageMapper.getPassagesByUId(id);
    }

    @GetMapping("/psg/draft/{uid}")
    public List<Passage> getDraftByUId(@PathVariable String uid) {
        return this.passageMapper.getDraftByUId(uid);
    }

    @GetMapping("/psg/varifying/{uid}")
    public List<Passage> getVarifyingByUId(@PathVariable String uid) {
        return this.passageMapper.getVerifyingPsgsByUId(uid);
    }

    @GetMapping("/psg/unpassed/{uid}")
    public List<Passage> getUnpassedByUId(@PathVariable String uid) {
        return this.passageMapper.getUnpassedPsgsByUId(uid);
    }

    @PostMapping("/psg")
    public String insertPsg(@RequestBody HashMap<String, String> map){
        this.passageMapper.insertPsg(new Passage(
                map.get("id"),
                map.get("title"),
                map.get("author"),
                map.get("headerImgUrl"),
                sdf.format(new Date()),
                0,
                0,
                map.get("content"),
                Integer.parseInt(map.get("viewedTime"))
        ));
        this.userService.psgNumChange(true, map.get("author"));
        return ToolService.jsonPackage("massage", "成功添加了一篇文章");
    }

    @PutMapping("/psg")
    public String updatePsg(@RequestBody HashMap<String, String> map){
        this.passageMapper.updatePsg(new Passage(
                map.get("id"),
                map.get("title"),
                map.get("author"),
                map.get("headerImgUrl"),
                sdf.format(new Date()),
                Integer.parseInt(map.get("liked")),
                Integer.parseInt(map.get("comments")),
                map.get("content"),
                Integer.parseInt(map.get("viewedTime")
        )));
        return ToolService.jsonPackage("massage", "成功修改了一篇文章");
    }

    @DeleteMapping("/psg/{id}")
    public String deletePsg(@PathVariable String id){
        Passage passage = passageMapper.getPassageById(id);
        this.passageMapper.deletePsg(id);
        User user = userMapper.getUserById(passage.getAuthor());
        userService.psgNumChange(false, user.getId());
        return ToolService.jsonPackage("massage", "成功删除了一篇文章");
    }

    @GetMapping("/psg/recs/{uid}")
    public List<Passage> getRecs(@PathVariable String uid) {
        return passageService.getRecsByUId(uid);
    }
}
