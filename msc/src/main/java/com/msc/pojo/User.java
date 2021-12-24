package com.msc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String id;
    private String nickName;
    private String password;
    private String email;
    private String birthday;
    private String gender;
    private String statement;   //为空
    private String regDate;     //注册日期
    private int point;
    private int loginTime;
    private String lastLogin;   //最后登录时间
    private int follows;
    private int followed;
    private int psgNum;
    private int collectNum;
    private int likedNum;
    private String avatarUrl;   //为空
}
