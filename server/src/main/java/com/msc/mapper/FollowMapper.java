package com.msc.mapper;

import com.msc.pojo.FollowMap;
import com.msc.pojo.LikeMap;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FollowMapper {
    @Select("select * from follows where id = #{id}")
    FollowMap getFlwMapById(String id);

    @Select("select * from follows where follower = #{follower}")
    List<FollowMap> getFlwMapByFollower(String follower);

    @Select("select * from follows where followed = #{followed}")
    List<FollowMap> getFlwMapByFollowed(String followed);

    @Insert("insert into follows (id ,follower, followed) values (#{id}, #{follower}, #{followed})")
    int insertFlwMap(FollowMap followMap);

    @Delete("delete from follows where id = #{id}")
    int deleteFlwMap(String id);

    @Delete("delete from follows where follower = #{flwer} and followed = #{flwed}")
    int deleteFlwByTwo(String flwer, String flwed);
}
