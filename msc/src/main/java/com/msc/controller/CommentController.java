package com.msc.controller;

import com.msc.mapper.CommentMapper;
import com.msc.pojo.Comment;
import com.msc.service.PassageService;
import com.msc.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private PassageService passageService;

    /**
     * 获取所有的评论
     * @return 评论列表
     */
    @GetMapping("/comments")
    public List<Comment> getAllComments(){
        return this.commentMapper.getComments();
    }

    /**
     * 根据评论id获取评论
     * @param id 评论id
     * @return 评论实体
     */
    @GetMapping("/comments/{id}")
    public Comment getComment(@PathVariable String id){
        return this.commentMapper.getCommentById(id);
    }

    /**
     * 根据文章id获取评论
     * @param psgId 文章id
     * @return 评论列表
     */
    @GetMapping("/comments/psg/{psgId}")
    public List<Comment> getCommentsByPsgId(@PathVariable String psgId){
        return this.commentMapper.getCommentsByPsgId(psgId);
    }

    /**
     * 根据用户id获取评论
     * @param userId 用户id
     * @return 评论列表
     */
    @GetMapping("/comments/user/{userId}")
    public List<Comment> getCommentsByUserId(@PathVariable String userId){
        return this.commentMapper.getCommentsByUserId(userId);
    }

    /**
     * 上传一个评论
     * @param map 提交体的映射
     * @return 成功信息
     */
    @PostMapping("/comment")
    public String insertComment(@RequestBody HashMap<String, String> map) throws ParseException {
        Comment comment = new Comment(
                map.get("id"),
                map.get("owner"),
                map.get("tarPsg"),
                map.get("content"),
                map.get("time"),
                0,
                0,
                0
        );
        this.commentMapper.insertComment(comment);
        passageService.incrCom(map.get("tarPsg"));
        return ToolService.jsonPackage("massage", "成功");
    }

    /**
     * 根据id删除一个评论
     * @param id 评论id
     * @return 成功信息
     */
    @DeleteMapping("/comment/{id}")
    public String deleteComment(@PathVariable String id){
        Comment comment = this.commentMapper.getCommentById(id);
        this.commentMapper.deleteComment(id);
        passageService.decrCom(comment.getTargetPsg());
        return ToolService.jsonPackage("massage", "成功删除");
    }
}
