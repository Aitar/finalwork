package com.msc.mapper;

import com.msc.pojo.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import redis.clients.jedis.Jedis;

@Repository
public class RateMapper {

    @Autowired
    MongoTemplate mongoTemplate;

    private final Jedis jedis = new Jedis("192.168.10.102");


    /**
     * 往mongo中插入一条评分数据
     * @param rate 需要插入的评分信息
     * @return
     */
    public int insertRate(Rate rate){
        mongoTemplate.save(rate);
        //redis更新数据
        if (jedis.exists("userId:" + rate.getUserId()) && jedis.llen("userId:" + rate.getUserId()) >= 40) {
            jedis.rpop("userId:" + rate.getUserId());
        }
        jedis.lpush("userId:" + rate.getUserId(), rate.getProductId() + ":" + rate.getScore());
        return 1;
    }

    /**
     * 更新一条评分数据
     * @param rate 需要更新的评分信息
     * @return
     */
    public int updateRate(Rate rate){
        Query query = new Query(Criteria.where("_id").is(rate.getId()));
        Update update = new Update();
        update.set("rating", rate.getScore());
        update.set("timestamp", rate.getTimestamp());
        mongoTemplate.updateFirst(query, update, Rate.class);
        //redis更新数据
        if (jedis.exists("userId:" + rate.getUserId()) && jedis.llen("userId:" + rate.getUserId()) >= 40) {
            jedis.rpop("userId:" + rate.getUserId());
        }
        jedis.lpush("userId:" + rate.getUserId(), rate.getProductId() + ":" + rate.getScore());
        return 1;
    }

    /**
     * 通过文章id和用户id找出评分数据，若没有这条则返回null
     * @param userId
     * @param psgaId
     * @return
     */
    public Rate getByTwo(String userId, String psgaId){
        Rate rate = null;
        Query query = new Query(Criteria.where("userid").is(userId).and("psgid").is(psgaId));
        rate = mongoTemplate.findOne(query, Rate.class);
        return rate;
    }
}
