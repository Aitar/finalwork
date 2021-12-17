package com.msc.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;
import java.util.regex.Pattern;

@RestController
public class uplodeimgController {

    private static final Pattern ImageExtensionRegex = Pattern.compile(".*\\.(gif|jpg|jpeg|tiff|png)$");

    @PostMapping("/image")
    public String upload(@RequestParam MultipartFile image) {
        System.out.println(image);
        if (image == null){
            return "上传文件为空";
        }
        if (!ImageExtensionRegex.matcher(Objects.requireNonNull(image.getOriginalFilename())).matches()){
            return "格式不匹配，请输入正确格式";
        }
        // 存储路径
        String savePath = "D:/"+buildFilename(image.getOriginalFilename());
        try {
            File image1 = new File(savePath);
            image.transferTo(image1);
            // TODO 图片保存的路径存入数据库
        }catch (Exception e){
            return "上传失败";
        }
        return "{\"img\":\"" + savePath+"\"}";
    }

    /**
     * 根据需要重命名
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

    @GetMapping(value = "/file/{fileName}")
    public ResponseEntity<FileSystemResource> getFile(@PathVariable("fileName") String fileName) throws FileNotFoundException {
        File file = new File("E:\\Study\\Senior\\final work\\finalwork\\files\\images\\avatars\\", fileName);
        if (file.exists()) {
            return export(file);
        }
        System.out.println(file);
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

}
