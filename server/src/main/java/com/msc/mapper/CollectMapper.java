package com.msc.mapper;

import com.msc.pojo.CollectMap;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CollectMapper {
    @Select("select * from collect_map where uid = #{uid}")
    List<CollectMap> getCollectMapByUserId(String uid);

    @Select("select * from collect_map where uid = #{uid} and pid = #{pid}")
    CollectMap getCollectMapByTwo(String uid, String pid);

    @Insert("insert into collect_map (id, uid, pid) values(#{id}, #{uid}, #{pid})")
    int insertCollect(CollectMap collectMap);

    @Delete("delete from collect_map where id = #{id}")
    int deleteCollectById(String id);

    @Delete("delete from collect_map where uid = #{uid} and pid = #{pid}")
    int delectByTwo(String uid, String pid);
}
