package com.msc.service;

import com.msc.mapper.PassageMapper;
import com.msc.pojo.Passage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PassageService {

    @Autowired
    PassageMapper passageMapper;


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
}
