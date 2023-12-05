package com.dita.metapilot.user.repository;

import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.dto.TokenDto;
import com.dita.metapilot.user.dto.UserDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.entity.UserRoleEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>사용자 관련 데이터 처리를 위한 MyBatis 매퍼 인터페이스</p>
 *
 * @author 권명승 (@myeongseung)
 * @since 2023. 11. 27.
 * @version 1.0.0
 * */
@Mapper
public interface UserRepository {

    /**
     * 사용자를 등록(회원가입)하는 메서드.
     *
     * @param registerDto 사용자가 입력한 회원가입 정보를 담은 DTO.
     * @return 회원가입이 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean registerUser(RegisterDto registerDto);

    /**
     * 사용자의 역할을 생성하는 메서드.
     *
     * @param registerDto 사용자의 역할 정보를 담은 DTO.
     * @return 역할 생성이 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean createRole(RegisterDto registerDto);

    /**
     * 토큰을 DB에 저장하는 메서드.
     *
     * @param tokenDto 사용자의 역할 정보를 담은 DTO.
     * @return 역할 생성이 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean createToken(TokenDto tokenDto);

    /**
     * 주어진 userId를 가진 사용자를 찾는 메서드.
     *
     * @param userId 찾고자 하는 사용자의 ID.
     * @return 해당 ID를 가진 사용자의 UserEntity 객체. 해당 사용자가 없으면 null을 반환합니다.
     */
    UserEntity findUserByUserId(String userId); //userId 중복 체크

    /**
     * <p>userId를 통해 Token이 DB에 저장되어 있는지 확인하는 메서드.</p>
     *
     * @param userId 찾고자 하는 사용자의 ID.
     * @return int값을 반환하여 count갯수를 출력 (1 or 0)
     */
    int findUserToken(String userId);

    /**
     * 주어진 userId로 사용자 정보를 가져오는 메서드.
     *
     * @param userId 가져오고자 하는 사용자의 ID.
     * @return 해당 ID를 가진 사용자의 UserEntity 객체. 해당 사용자가 없으면 null을 반환합니다.
     */
    UserEntity getUser(String userId); //유저 정보 가져오기

    /**
     * 사용자의 방문 기록을 저장하는 메서드.
     *
     * @param userId 방문 기록을 저장할 사용자의 ID.
     * @return 방문 기록 저장이 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean userVisit(String userId);



}
