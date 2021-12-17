package com.msc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Passage {
    private String id;
    private String title;
    private String author;
    private String headerImgUrl;
    private String updateTime;
    private int liked;
    private int comments;
    private String content;
    private int viewedTime;

    int getViewdTime(){
        return viewedTime;
    }
}
