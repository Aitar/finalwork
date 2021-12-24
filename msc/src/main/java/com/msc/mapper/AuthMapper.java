package com.msc.mapper;

import com.msc.pojo.Auth;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface AuthMapper {

    @Select("select * from auth")
    List<Auth> getAuth();
}
