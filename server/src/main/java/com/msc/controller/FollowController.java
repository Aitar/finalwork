package com.msc.controller;

import com.msc.mapper.FollowMapper;
import com.msc.mapper.UserMapper;
import com.msc.pojo.FollowMap;
import com.msc.pojo.User;
import com.msc.service.ToolService;
import com.msc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class FollowController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private FollowMapper followMapper;

    @Autowired
    private UserService userService;

    /**
     * 根据关注者id获取其关注映射列表
     * @param follower 关注者id
     * @return 关注映射列表
     */
    @GetMapping("/flw/flwer/{follower}")
    public List<FollowMap> getFlwMapFlwerId(@PathVariable String follower){
        return this.followMapper.getFlwMapByFollower(follower);
    }

    /**
     * 根据被关注者id获取其关注映射列表
     * @param followed 被关注者id
     * @return 关注映射列表
     */
    @GetMapping("/flw/flwed/{followed}")
    public List<FollowMap> getFlwMapByFlwedId(@PathVariable String followed){
        return this.followMapper.getFlwMapByFollowed(followed);
    }

    /**
     * 根据用户id获取其关注用户
     * @param follower 需要获取关注用户的用户id
     * @return 返回其关注用户列表
     */
    @GetMapping("/flw/flwerUser/{follower}")
    public List<User> getUserByFlwerId(@PathVariable String follower){
        List<FollowMap> followMaps = this.followMapper.getFlwMapByFollower(follower);
        List<User> users = new ArrayList<>();
        for(FollowMap flw: followMaps){
            users.add(userMapper.getUserById(flw.getFollowed()));
        }
        return users;
    }

    /**
     * 根据用户id获取其粉丝用户列表
     * @param followed 用户id
     * @return 粉丝用户列表
     */
    @GetMapping("/flw/flwedUser/{followed}")
    public List<User> getUserByFlwedId(@PathVariable String followed){
        List<FollowMap> followMaps = this.followMapper.getFlwMapByFollowed(followed);
        List<User> users = new ArrayList<>();
        for(FollowMap flw: followMaps){
            users.add(userMapper.getUserById(flw.getFollower()));
        }
        return users;
    }

    @PostMapping("/flw")
    public String insertFollow(@RequestBody HashMap<String, String> map){
        this.followMapper.insertFlwMap(new FollowMap(map.get("id"), map.get("follower"), map.get("followed")));
        User flwer = this.userMapper.getUserById(map.get("follower"));
        User flwed = this.userMapper.getUserById(map.get("followed"));
        this.userService.flwChange(true, flwer, flwed);
        return ToolService.jsonPackage("massage", "成功插入一条关注信息");
    }

    @DeleteMapping("/flw/{id}")
    public String deleteFollow(@PathVariable String id){
        FollowMap followMap = this.followMapper.getFlwMapById(id);
        this.followMapper.deleteFlwMap(id);
        User flwer = this.userMapper.getUserById(followMap.getFollower());
        User flwed = this.userMapper.getUserById(followMap.getFollowed());
        this.userService.flwChange(false, flwer, flwed);
        return ToolService.jsonPackage("massage", "成功删除关注信息" + id);
    }

    @PostMapping("/flw/delete")
    public String deleteByTwo(@RequestBody HashMap<String, String> map){
        this.followMapper.deleteFlwByTwo(map.get("follower"), map.get("followed"));
        User flwer = this.userMapper.getUserById(map.get("follower"));
        User flwed = this.userMapper.getUserById(map.get("followed"));
        this.userService.flwChange(false, flwer, flwed);
        return ToolService.jsonPackage("massage", "成功删除");
    }
}
