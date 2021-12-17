package com.msc.controller;

import com.msc.mapper.AuthMapper;
import com.msc.pojo.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuthController {

    @Autowired
    private AuthMapper authMapper;

    @GetMapping("/auth")
    public List<Auth> getAuthList(){
        List<Auth> auths = authMapper.getAuth();
        return auths;
    }

}
