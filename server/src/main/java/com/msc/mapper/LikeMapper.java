package com.msc.mapper;

import com.msc.pojo.LikeMap;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LikeMapper {
    @Select("select * from like_map where id = #{id}")
    LikeMap getLikeMapById(String id);

    @Select("select * from like_map where uid = #{uid}")
    List<LikeMap> getLikeMapByUserId(String uid);

    @Select("select * from like_map where pid = #{pid}")
    List<LikeMap> getLikeMapByPsgId(String pid);

    @Insert("insert into like_map (id, uid, pid) values(#{id}, #{uid}, #{pid})")
    int insertLikeMap(LikeMap likeMap);

    @Delete("delete from like_map where id = #{id}")
    int deleteLikeMap(String id);
}
