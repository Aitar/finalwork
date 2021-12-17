package com.msc.mapper;

import com.msc.pojo.Comment;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CommentMapper {

    @Select("select * from comments")
    @Results(id = "commentMap", value = {
            @Result(id = true, column = "id", property = "id"),
            @Result(column = "target_pass", property = "targetPsg"),
            @Result(column = "follow_num", property = "followNum"),
            @Result(column = "like_num", property = "likeNum")
    })
    List<Comment> getComments();

    @Select("select * from comments where id = #{id}")
    @ResultMap(value = {"commentMap"})
    Comment getCommentById(String id);

    @Select("select * from comments where target_pass = #{psgId}")
    @ResultMap(value = {"commentMap"})
    List<Comment> getCommentsByPsgId(String psgId);

    @Select("select * from comments where owner = #{userId}")
    @ResultMap(value = {"commentMap"})
    List<Comment> getCommentsByUserId(String userId);

    @Insert("insert into comments(" +
            "id," +
            "owner," +
            "target_pass," +
            "content," +
            "time," +
            "follow_num," +
            "hot_index)" +
            "values(" +
            "#{id}," +
            "#{owner}," +
            "#{targetPsg}," +
            "#{content}," +
            "#{time}," +
            "#{followNum}," +
            "#{hotIndex})")
    int insertComment(Comment comment);

    @Delete("delete from comments where id = #{id}")
    int deleteComment(String id);

    @Update("update comments set" +
            "owner = #{owner}," +
            "target_pass = #{targetPsg}," +
            "content = #{content}," +
            "time = #{time}," +
            "follow_num = #{followNum}," +
            "hot_index = #{hotIndex}" +
            "where id = #{id}")
    int updateComment(Comment comment);
}
