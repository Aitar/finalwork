package com.msc.controller;

import com.msc.mapper.RateMapper;
import com.msc.pojo.Rate;
import com.msc.service.ToolService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;


@RestController
public class RateController {

    @Autowired
    RateMapper rateMapper;

    private static final Logger logger = Logger.getLogger(RateController.class.getName());

    @PostMapping("/rate")
    public String rate(@RequestBody HashMap<String, String> map){
        Rate old = this.rateMapper.getByTwo(map.get("userId"), map.get("psgId"));
        Rate rate = new Rate(
                map.get("id"),
                Integer.parseInt(map.get("userId")),
                Integer.parseInt(map.get("psgId")),
                Double.valueOf(map.get("Rating")),
                Integer.valueOf(map.get("timestamp").substring(0, map.get("timestamp").length() - 3))
        );
        if(old == null){
            this.rateMapper.insertRate(rate);
        }else{
            rate.setId(old.getId());
            this.rateMapper.updateRate(rate);
        }

        System.out.print("=========埋点=========");
        logger.info("PRODUCT_RATING_PREFIX:" + map.get("userId") +"|"+ map.get("psgId") +"|"+ map.get("Rating") +"|"+ System.currentTimeMillis()/1000);

        return ToolService.jsonPackage("massage", "成功插入评分");
    }
}
