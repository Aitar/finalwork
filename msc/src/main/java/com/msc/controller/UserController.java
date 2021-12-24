package com.msc.controller;

import com.msc.mapper.UserMapper;
import com.msc.pojo.User;
import com.msc.service.ToolService;
import com.msc.service.UserService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
public class UserController {

    private final UserMapper userMapper;

    private final UserService userService;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public UserController(UserMapper userMapper, UserService userService) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUserList() {
        List<User> users = userMapper.getUserList();
        for (User user : users) {
            System.out.println(user);
        }
        return users;
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable String id) {
        return userMapper.getUserById(id);
    }

    @PostMapping("/user")
    public String insertUser(@RequestBody HashMap<String, String> map) {

            userMapper.insertUser(new User(
                    map.get("id"),
                    map.get("nickName"),
                    map.get("password"),
                    map.get("email"),
                    sdf.format(new Date()),
                    "保密",
                    null,
                    sdf.format(new Date()),
                    0,
                    0,
                    null,
                    0,
                    0,
                    0,
                    0,
                    0,
                    "default"
            ));


        return ToolService.jsonPackage("massage", map.get("id"));
    }

    @PutMapping("/user/{id}")
    public String updateUser(@RequestBody HashMap<String, String> map) throws ParseException {
            this.userMapper.updateUser(new User(
                    map.get("id"),
                    map.get("nickName"),
                    map.get("password"),
                    map.get("email"),
                    map.get("birthday"),
                    map.get("gender"),
                    map.get("statement"),
                    map.get("regDate"),
                    Integer.parseInt(map.get("point")),
                    Integer.parseInt(map.get("loginTime")),
                    map.get("lastLogin"),
                    Integer.parseInt(map.get("follows")),
                    Integer.parseInt(map.get("followed")),
                    Integer.parseInt(map.get("psgNum")),
                    Integer.parseInt(map.get("collectNum")),
                    Integer.parseInt(map.get("likedNum")),
                    map.get("avatarUrl")
            ));
            return ToolService.jsonPackage("massage", "更新成功");
    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable String id) {
        this.userMapper.deleteUser(id);
        return ToolService.jsonPackage("massage", "删除成功");
    }

    /**
     * 用户上传头像接口
     * @param avatar 头像上传的文件
     * @param id 用户ID
     * @return 上传成功信息
     */
    @PostMapping("/user/avatar/{id}")
    public String avatarUpload(@RequestParam MultipartFile avatar, @PathVariable String id) {
        User user = this.userMapper.getUserById(id);
        return this.userService.avatarUpload(avatar, user);
    }

    /**
     * 根据id用户获取用户头像
     * @param id 用户id
     * @return 头像文件
     */
    @GetMapping("/user/avatar/{id}")
    public ResponseEntity<FileSystemResource> avatarGetter(@PathVariable("id") String id){
        return this.userService.avatarGet(id);
    }

    @GetMapping("/user/cover/{id}")
    public ResponseEntity<FileSystemResource> coverGetter(@PathVariable("id") String id){
        return this.userService.coverGet(id);
    }


    @PostMapping("/user/auth")
    public String auth(@RequestBody HashMap<String, String> map) throws Exception {
       String id = this.userService.auth(map.get("email"), map.get("password"));
       if(id == null){
           throw new Exception("用户名或密码错误");
       }else {
           return ToolService.jsonPackage("massage", id);
       }
    }
}
