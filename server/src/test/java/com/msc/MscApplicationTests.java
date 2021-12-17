//package com.msc;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.mongodb.MongoClient;
//import com.mongodb.client.FindIterable;
//import com.mongodb.client.MongoCollection;
//import com.mongodb.client.model.Filters;
//import com.mongodb.util.JSON;
//import com.msc.controller.RateController;
//import com.msc.mapper.PassageMapper;
//import com.msc.mapper.RateMapper;
//import com.msc.mapper.UserMapper;
//import com.msc.pojo.Passage;
//import com.msc.pojo.Rate;
//import com.msc.pojo.User;
//import org.apache.log4j.Logger;
//import org.bson.Document;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import javax.sql.DataSource;
//import java.io.IOException;
//import java.sql.Date;
//import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.List;
//
//@SpringBootTest
//class MscApplicationTests {
//    public class Product {
//
//        @JsonIgnore
//        private String _id;
//
//        private int productId;
//
//        private String name;
//
//        private String imageUrl;
//
//        private Double score;
//
//        private String categories;
//
//        private String tags;
//
//        public int getProductId() {
//            return productId;
//        }
//
//        public void setProductId(int productId) {
//            this.productId = productId;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//        public void setName(String name) {
//            this.name = name;
//        }
//
//        public String getCategories() {
//            return categories;
//        }
//
//        public void setCategories(String categories) {
//            this.categories = categories;
//        }
//
//        public String getTags() { return tags; }
//
//        public void setTags(String tags) { this.tags = tags; }
//
//        public Double getScore() {
//            return score;
//        }
//
//        public void setScore(Double score) {
//            this.score = score;
//        }
//
//        public String getImageUrl() { return imageUrl; }
//
//        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
//
//        public String get_id() {
//            return _id;
//        }
//
//        public void set_id(String _id) {
//            this._id = _id;
//        }
//    }
//
//    @Autowired
//    DataSource dataSource;
//
//    @Autowired
//    UserMapper userMapper;
//
//    @Autowired
//    RateMapper rateMapper;
//
//    @Autowired
//    PassageMapper passageMapper;
//
//    @Autowired
//    private MongoClient mongoClient;
//
//    private MongoCollection<Document> averageProductsScoreCollection;
//
//    private static Logger logger = Logger.getLogger(MscApplicationTests.class.getName());
//
//    @Test
//    void contextLoads() throws SQLException {
////        Rate byTwo = this.rateMapper.getByTwo("544", "555");
////        System.out.print("=========埋点=========");
////        logger.info("PRODUCT_RATING_PREFIX:" + byTwo.getUserid() +"|"+ byTwo.getPsgid() +"|"+ byTwo.getRating() +"|"+ System.currentTimeMillis()/1000);
////        System.out.println();
//    }
//
//
//}
