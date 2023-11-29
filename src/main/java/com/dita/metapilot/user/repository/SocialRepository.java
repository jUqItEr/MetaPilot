package com.dita.metapilot.user.repository;

import com.dita.metapilot.user.dto.SocialRegisterDto;
import com.dita.metapilot.user.entity.SocialUserEntity;
import com.dita.metapilot.user.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SocialRepository {
    UserEntity getUser(String socialId); //유저 정보 찾기
    boolean checkDuplicate(SocialRegisterDto socialRegisterDto);
    boolean createUser(SocialRegisterDto socialRegisterDto);
}
