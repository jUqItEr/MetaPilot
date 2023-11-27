package com.dita.metapilot.user.repository;

import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.entity.UserRoleEntity;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface UserRepository {

    public int registerUser(RegisterDto registerDto); //회원가입

    public int createRoleUser(UserRoleEntity userRoleEntity);

    public UserEntity findUserByUserId(String userId); //userId 중복 체크

    public UserEntity getUser(String userId);

    public boolean userVisit(String userId);
}
