package com.dita.metapilot.user.repository;

import com.dita.metapilot.user.dto.SocialRegisterDto;
import com.dita.metapilot.user.entity.SocialUserEntity;
import com.dita.metapilot.user.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SocialRepository {
    UserEntity getUser(String socialId); //유저 정보 찾기
    boolean createUser(SocialRegisterDto socialRegisterDto); //회원 가입
    boolean createRole(SocialRegisterDto socialRegisterDto); //권한 추가
    UserEntity checkDuplicate(SocialRegisterDto socialRegisterDto); // 소셜 아이디 체크, email 체크

    UserEntity findUserBySocialId(String socialId);
}
