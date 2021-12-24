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
    public String upload(@RequestParam MultipartFile file) {
        System.out.println(file);
        if (file == null){
            return "上传文件为空";
        }
        // 存储路径
        String fileName = buildFilename(Objects.requireNonNull(file.getOriginalFilename())) + ".jpg";
        String savePath = "D:\\IdeaProjects\\msc\\assets\\imgs\\psgs\\";    //这个路径还需要更改
        File saveFile = new File(savePath);
        if(!saveFile.exists()) {
            boolean mkdirs = saveFile.mkdirs();
        }
        try {
            File image1 = new File(savePath + fileName);
            file.transferTo(image1);
            // 图片保存的路径存入数据库
        }catch (Exception e){
            return "{ \"location\": \"图片上传失败\" }";
        }
        return "{ \"location\": \"http://192.168.50.196:8088/file/" + fileName + "\" }";
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
    public ResponseEntity<FileSystemResource> getFile(@PathVariable("fileName") String fileName) {
        File file = new File("./assets/imgs/psgs", fileName);
        if (file.exists()) {
            return export(file);
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

}
