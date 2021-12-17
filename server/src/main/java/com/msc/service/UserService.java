package com.msc.service;

import com.msc.mapper.UserMapper;
import com.msc.pojo.User;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;
import java.util.regex.Pattern;

@Component
public class UserService {
    //头像上传文件类型
    private static final Pattern ImageExtensionRegex = Pattern.compile(".*\\.(gif|jpg|jpeg|tiff|png)$");
    @Autowired
    UserMapper userMapper;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 头像上传方法，要求前端传输过来的文件名为avatar
     * @param avatar
     * @return
     */
    public String avatarUpload(MultipartFile avatar, User user){
        if (avatar == null){
            return "{\"massage\":\"上传文件为空\"}";
        }
        if (!ImageExtensionRegex.matcher(Objects.requireNonNull(avatar.getOriginalFilename())).matches()){
            return "{\"massage\":\"格式不正确\"}";
        }
        String fileName = buildFilename(avatar.getOriginalFilename());
        // 存储路径
        String savePath = "E:/Study/Senior/final work/finalwork/files/images/avatars"+ fileName;
        try {
            File image1 = new File(savePath);
            avatar.transferTo(image1);
            // TODO 图片保存的路径存入数据库
            user.setAvatarUrl(fileName);
            userMapper.updateUser(user);
        }catch (Exception e){
            return "{\"massage\":\"上传图片失败\"}";
        }
        return "{\"img\":\"" + fileName +"\"}";
    }

    /**
     * 文件命名方法命名
     * @param fileName
     * @return
     */
    private String buildFilename(String fileName) {
        String suffix = "";
        if (fileName.contains(".")) {
            suffix = fileName.substring(fileName.lastIndexOf("."));
        }
        return UUID.randomUUID().toString() + suffix;
    }

    /**
     * 头像获取方法
     * @param id
     * @return
     * @throws IOException
     */
    public ResponseEntity<FileSystemResource> avatarGet(String id){
        User user = this.userMapper.getUserById(id);
        File file = new File("E:\\Study\\Senior\\final work\\finalwork\\files\\images\\avatars\\" + user.getAvatarUrl() + ".jpg");
        if (file.exists()) {
            return this.export(file);
        }
        return null;
    }

    public ResponseEntity<FileSystemResource> export(File file) {
        if (file == null) {
            return null;
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Content-Disposition", "attachment; filename=" + file.getName());
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        headers.add("Last-Modified", new Date().toString());
        headers.add("ETag", String.valueOf(System.currentTimeMillis()));
        return ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(MediaType.parseMediaType("application/octet-stream")).body(new FileSystemResource(file));
    }

    public String auth(String email, String password){
        User user = this.userMapper.getUserByEmail(email);
        user.setLastLogin(sdf.format(new Date()));
        user.setLoginTime(user.getLoginTime() + 1);
        this.userMapper.updateUser(user);
        if(user.getPassword().equals(password))
            return user.getId();
        else
            return null;
    }

    public void flwChange(boolean incr, User flwer, User flwed){
        if(incr){
            flwer.setFollows(flwer.getFollows() + 1);
            flwed.setFollowed(flwed.getFollowed() + 1);
        }else{
            flwer.setFollows(flwer.getFollows() - 1);
            flwed.setFollowed(flwed.getFollowed() - 1);
        }
        this.userMapper.updateUser(flwed);
        this.userMapper.updateUser(flwer);
    }

    public void psgNumChange(boolean incr, String uid){
        User user = userMapper.getUserById(uid);
        if(incr) {
            user.setPsgNum(user.getPsgNum() + 1);
        }else {
            user.setPsgNum(user.getPsgNum() - 1);
        }
        this.userMapper.updateUser(user);
    }
}
