package com.msc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlwComment {
    private String id;
    private String owner;
    private String tarComment;
    private String content;
    private String time;
    private int hotIndex;
}
