package com.msc.mapper;

import com.msc.pojo.ViewTrace;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ViewTraceMapper {
    @Select("select * from view_trace")
    @Results(id="traceMap",
            value = {
                    @Result(column = "uid", property = "userId"),
                    @Result(column = "pid", property = "psgId")
            })
    List<ViewTrace> getAllTrace();

    @Select("select * from view_trace where uid = #{userId}")
    @ResultMap(value = "traceMap")
    List<ViewTrace> getByUserId(String userId);

    @Select("select * from view_trace where uid = #{psgId}")
    @ResultMap(value = "traceMap")
    List<ViewTrace> getByPsgId(String psgId);

    @Insert("insert into view_trace(id, uid, time, pid) " +
            "values(#{id}, #{userId}, #{time} ,#{psgId})")
    int insertTrace(ViewTrace viewTrace);
}
