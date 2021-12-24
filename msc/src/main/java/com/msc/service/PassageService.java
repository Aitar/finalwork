package com.msc.service;

import com.msc.mapper.PassageMapper;
import com.msc.pojo.Passage;
import com.msc.pojo.Rate;
import com.msc.pojo.Recs;
import com.msc.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;
import java.util.regex.Pattern;

@Component
public class PassageService {

    private static final Pattern ImageExtensionRegex = Pattern.compile(".*\\.(gif|jpg|jpeg|tiff|png)$");

    @Autowired
    PassageMapper passageMapper;

    @Autowired
    MongoTemplate mongoTemplate;

    /**
     * 获取某个用户的推荐列表
     * @param userId
     * @return
     */
    public List<Passage> getRecsByUId(String userId) {
        Query query = new Query(Criteria.where("userId").is(Integer.parseInt(userId)));
        Recs recs = mongoTemplate.findOne(query, Recs.class);
        List<Passage> psgs = new LinkedList<>();
        if (recs != null) {
            for(Map<String, String> map: recs.getRecs()) {
                psgs.add(passageMapper.getPassageById(map.get("productId")));
            }
        } else {
            psgs = passageMapper.getPassages();
        }
        return psgs;
    }


    public void incrLiked(String id){
        Passage passage = passageMapper.getPassageById(id);
        passage.setLiked(passage.getLiked() + 1);
        passageMapper.updatePsg(passage);
    }

    public void decrLiked(String id){
        Passage passage = passageMapper.getPassageById(id);
        passage.setLiked(passage.getLiked() - 1);
        passageMapper.updatePsg(passage);
    }

    public void incrCom(String id){
        Passage passage = passageMapper.getPassageById(id);
        passage.setComments(passage.getComments() + 1);
        passageMapper.updatePsg(passage);
    }

    public void decrCom(String id){
        Passage passage = passageMapper.getPassageById(id);
        passage.setComments(passage.getComments() - 1);
        passageMapper.updatePsg(passage);
    }

    public void viewed(String psgId, String userId){
        Passage passage = passageMapper.getPassageById(psgId);
        passage.setComments(passage.getViewedTime() + 1);
        passageMapper.updatePsg(passage);
    }

    public ResponseEntity<FileSystemResource> coverGet(String id){
        File file = new File("./assets/imgs/covers/" + id + ".jpg");

        if (file.exists()) {
            return this.export(file);
        } else {
            return export(new File("./assets/imgs/covers/defulat.jpg"));
        }
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

    public String imgUpload(MultipartFile img){
        if (img == null){
            return "{\"massage\":\"上传文件为空\"}";
        }
        if (!ImageExtensionRegex.matcher(Objects.requireNonNull(img.getOriginalFilename())).matches()){
            return "{\"massage\":\"格式不正确\"}";
        }
        String fileName = buildFilename(img.getOriginalFilename());
        // 存储路径
        String savePath = "./assets/imgs/psgs"+ fileName;
        try {
            File image1 = new File(savePath);
            img.transferTo(image1);
            // 图片保存的路径存入数据库
        }catch (Exception e){
            return "{\"massage\":\"上传图片失败\"}";
        }
        return "{\"img\":\"" + fileName +"\"}";
    }

    private String buildFilename(String fileName) {
        String suffix = "";
        if (fileName.contains(".")) {
            suffix = fileName.substring(fileName.lastIndexOf("."));
        }
        return UUID.randomUUID().toString() + suffix;
    }


}
