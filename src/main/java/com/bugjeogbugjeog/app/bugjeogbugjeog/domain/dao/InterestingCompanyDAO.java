package com.bugjeogbugjeog.app.bugjeogbugjeog.domain.dao;

import com.bugjeogbugjeog.app.bugjeogbugjeog.domain.dto.InterestingCompanyDTO;
import com.bugjeogbugjeog.app.bugjeogbugjeog.domain.vo.InterestingCriteria;
import com.bugjeogbugjeog.app.bugjeogbugjeog.mapper.InterestingCompanyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class InterestingCompanyDAO {

    private final InterestingCompanyMapper interestingCompanyMapper;

    //         관심업체 리스트
    public List<InterestingCompanyDTO> findAllToInterestingCompany(Long memberId, InterestingCriteria interestingCriteria){
        return interestingCompanyMapper.selectInterestingCompany(memberId, interestingCriteria);
    }

    //    갯수 가져오기
    public int count(Long memberId){
        return interestingCompanyMapper.count(memberId);
    }
    public void deleteByInterestingCompany(Long interestingCompanyId) {
        interestingCompanyMapper.deleteByInterestingCompany(interestingCompanyId);
    }

}
