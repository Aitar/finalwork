package com.msc;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.util.JSON;
import com.msc.controller.RateController;
import com.msc.mapper.PassageMapper;
import com.msc.mapper.RateMapper;
import com.msc.mapper.UserMapper;
import com.msc.pojo.Passage;
import com.msc.pojo.Rate;
import com.msc.pojo.User;
import org.apache.log4j.Logger;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
class MscApplicationTests {

    @Autowired
    RateController rateController;

    @Autowired
    UserMapper userMapper;

    @Autowired
    PassageMapper passageMapper;

    /*
    Rate rate = new Rate(
                map.get("id"),
                map.get("userId"),
                map.get("psgId"),
                Double.valueOf(map.get("Rating")),
                Long.valueOf(map.get("timestamp"))
        );
     */
    @Test
    void contextLoads() {
        int rateId = 1687262624;
        List<Passage> psgs = passageMapper.getPassages();
        List<User> users = userMapper.getUserList();
        HashMap<String, String> map;
        for (User user: users) {
            for (int gap = (int) (Math.random() * 100); gap < psgs.size(); gap += (gap + 1)) {
                map = new HashMap<>();
                map.put("id", String.valueOf(++rateId));
                map.put("userId", user.getId());
                map.put("psgId", psgs.get(gap).getId());
                map.put("Rating", String.valueOf((int)(Math.random() * 5)));
                map.put("timestamp", String.valueOf(1587262624 + (int)(Math.random() * 1000)));
                rateController.rate(map);
            }
        }
    }


}
