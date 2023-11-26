package com.dita.metapilot.user.repository;

import com.dita.metapilot.user.dto.RegisterDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {

    public int saveUser(RegisterDto registerDto);
}
