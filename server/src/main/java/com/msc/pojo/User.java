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
    private String statement;
    private String regDate;
    private int point;
    private int loginTime;
    private String lastLogin;
    private int follows;
    private int followed;
    private int psgNum;
    private int collectNum;
    private int likedNum;
    private String avatarUrl;
}
