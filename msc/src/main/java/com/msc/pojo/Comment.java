package com.msc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private String id;
    private String owner;
    private String targetPsg;
    private String content;
    private String time;
    private int followNum;
    private int likeNum;
    private int hotIndex;
}
