package com.msc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rate {
    private String id;
    private Integer userId;
    private Integer productId;
    private Double score;
    private Integer timestamp;
}
