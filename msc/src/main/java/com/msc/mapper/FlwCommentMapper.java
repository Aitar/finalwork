package com.msc.mapper;

import com.msc.pojo.FlwComment;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FlwCommentMapper {

    @Select("select * from follow_comments")
    @Results(value = {
            @Result(column = "tar_comment", property = "tarComment"),
            @Result(column = "hot_index", property = "hotIndex")
    })
    List<FlwComment> getFlwComments();

    @Select("select * from follow_comments where tar_comment = #{tarComment}")
    List<FlwComment> getFlwComByTarCom(String tarComment);

    @Select("select * from follow_comments where owner = #{owner}")
    List<FlwComment> getFlwComByOwner(String owner);

    @Insert("insert into follow_comments (id, owner, tar_comment, content, time, hot_index)" +
            "values(#{id}, #{owner}, #{tarComment}, #{content}, #{time}, #{hotIndex})")
    int insertFlwComment(FlwComment flwComment);

    @Delete("delete from follow_comments where id = #{id}")
    int deleteFlwComment(String id);
}
