package com.bugjeogbugjeog.app.bugjeogbugjeog.service;

import com.bugjeogbugjeog.app.bugjeogbugjeog.domain.dao.BusinessReviewDAO;
import com.bugjeogbugjeog.app.bugjeogbugjeog.domain.dto.BusinessReviewDTO;
import com.bugjeogbugjeog.app.bugjeogbugjeog.domain.vo.BusinessReviewVO;
import com.bugjeogbugjeog.app.bugjeogbugjeog.domain.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@Qualifier("review")
@Primary
@RequiredArgsConstructor
public class BusinessReviewService {
    private final BusinessReviewDAO businessReviewDAO;

    public List<BusinessReviewDTO> getReviews(long boardBusinessId) {
        return businessReviewDAO.findById(boardBusinessId);
    }

    public MemberVO getMember(Long memberId){
        return businessReviewDAO.findByMemberId(memberId);
    }

    //    추가
    public void save(BusinessReviewVO businessReviewVO) {
        businessReviewDAO.save(businessReviewVO);
    }

    //    삭제
//    public void remove(Long businessId) {
//        businessBoardDAO.deleteById(businessId);
//    }

//    //    조회
//    public boolean getBoard(Long boardBusinessId) {
//        return businessBoardDAO.findById(boardBusinessId);
//    }

    public boolean wasReview(Long memberId, Long boardBusinessId) {
        AtomicBoolean flag = new AtomicBoolean(false);
        businessReviewDAO.findById(boardBusinessId).stream().forEach(businessReviewDTO -> {
            if(businessReviewDTO.getMemberId().equals(memberId)){
                flag.set(true);
            }
        });
        return flag.get();
    }

    //    목록(대표 이미지 하나)
//    public List<BoardBusinessDTO> getList() {
//        return businessBoardDAO.findAll();
//    }

    //    목록(대표 이미지 하나)
//    public List<BoardBusinessDTO> getList(Map<String, Object> searchMap) {
//        return businessBoardDAO.findAll(searchMap);
//    }

}
