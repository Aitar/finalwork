package com.msc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rate {
    private String id;
    private String userid;
    private String psgid;
    private Double rating;
    private Long timestamp;
}
