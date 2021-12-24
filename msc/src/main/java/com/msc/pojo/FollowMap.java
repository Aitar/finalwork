package com.msc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowMap {
    private String id;
    private String follower;
    private String followed;
}
