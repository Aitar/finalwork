package com.msc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ViewTrace {
    private String id;
    private String userId;
    private String psgId;
    private String time;
}
