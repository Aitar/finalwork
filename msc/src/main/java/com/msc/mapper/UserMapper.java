package com.msc.mapper;
import com.msc.pojo.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper {

    //获取所有用户
    @Select("select * from users")
    @Results(id="userMap",
            value = {
            @Result(column = "avatar_url", property = "avatarUrl"),
            @Result(column = "pass_num", property = "psgNum")
    })
    List<User> getUserList();

    //按照id获取用户
    @Select("select * from users where id=#{id}")
    @ResultMap(value = {"userMap"})
    User getUserById(String id);

    @Select("select * from users where email=#{email}")
    @ResultMap(value = {"userMap"})
    User getUserByEmail(String email);

    @Insert("insert into users(" +
            "id, " +
            "nickname, " +
            "password, " +
            "email, " +
            "avatar_url," +
            "birthday, " +
            "gender, " +
            "statement, " +
            "regdate, " +
            "point, " +
            "login_time, " +
            "last_login, " +
            "follows, " +
            "followed, " +
            "pass_num, " +
            "collect_num, " +
            "liked_num) " +
            "values (" +
            "#{id}, " +
            "#{nickName}, " +
            "#{password}, " +
            "#{email}, " +
            "#{avatarUrl}," +
            "#{birthday}, " +
            "#{gender}, " +
            "#{statement}, " +
            "#{regDate}, " +
            "#{point}, " +
            "#{loginTime}, " +
            "#{lastLogin}, " +
            "#{follows}, " +
            "#{followed}, " +
            "#{psgNum}, " +
            "#{collectNum}, " +
            "#{likedNum})"
    )
    int insertUser(User user);

    @Update("update users set " +
            "nickname = #{nickName}," +
            "password = #{password}," +
            "birthday = #{birthday}," +
            "avatar_url = #{avatarUrl}," +
            "gender = #{gender}," +
            "statement = #{statement}," +
            "point = #{point}," +
            "login_time = #{loginTime}," +
            "last_login = #{lastLogin}," +
            "follows = #{follows}," +
            "followed = #{followed}," +
            "pass_num = #{psgNum}," +
            "collect_num = #{collectNum}," +
            "liked_num = #{likedNum} " +
            "where id = #{id}")
    int updateUser(User user);

    @Delete("delete from users where id = #{id}")
    int deleteUser(String id);
}
