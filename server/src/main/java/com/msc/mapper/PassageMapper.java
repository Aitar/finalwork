package com.msc.mapper;

import com.msc.pojo.Passage;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PassageMapper {

    /**
     * 获取所有的文章
     * @return 返回文章列表
     */
    @Select("select * from passages")
    @Results(value = @Result(column = "header_img_url", property = "headerImgUrl"))
    List<Passage> getPassages();

    @Select("select * from passages where author = #{id}")
    @Results(value = @Result(column = "header_img_url", property = "headerImgUrl"))
    List<Passage> getPassagesByUId(String id);

    /**
     * 获取所有的文章
     * @return 返回文章列表
     */
    @Select("select * from passages where id = #{id}")
    @Results(value = @Result(column = "header_img_url", property = "headerImgUrl"))
    Passage getPassageById(String id);

    /**
     * 插入一篇文章
     * @param passage 需要插入的文章
     * @return
     */
    @Insert("insert into passages(" +
            "id," +
            "title," +
            "author," +
            "header_img_url," +
            "liked," +
            "comments," +
            "content," +
            "viewed_time," +
            "update_time)" +
            "values(" +
            "#{id}," +
            "#{title}," +
            "#{author}," +
            "#{headerImgUrl}," +
            "#{liked}," +
            "#{comments}," +
            "#{content}," +
            "#{viewdTime}," +
            "#{updateTime})")
    int insertPsg(Passage passage);

    /**
     * 根据id删除一篇文章
     * @param id 需要删除的文章id
     * @return
     */
    @Delete("delete from passages where id = #{id};")
    int deletePsg(String id);

    @Update("update passages set " +
            "title = #{title}," +
            "header_img_url = #{headerImgUrl}," +
            "liked = #{liked}," +
            "comments = #{comments}," +
            "content = #{content}," +
            "viewed_time = #{viewedTime}," +
            "update_time = #{updateTime}" +
            " where id = #{id}")
    int updatePsg(Passage passage);
}
