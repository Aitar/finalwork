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
    /**
     * viewedTime
     *      >= 0： 正常状态文章
     *      == -1：草稿 draft
     *      == -2：审核中的文章
     *      == -3：审核未通过的文章
     */

    int getViewdTime(){
        return viewedTime;
    }
}
