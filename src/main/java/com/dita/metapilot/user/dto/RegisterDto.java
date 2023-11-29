package com.dita.metapilot.user.dto;

import com.dita.metapilot.user.entity.UserRoleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
/**
 * 사용자 등록 시 사용되는 데이터 전송 객체(DTO).
 *
 * <p>사용자 등록 과정에서 필요한 사용자 정보</p>
 * <p>필드:</p>
 * <p>- id: 사용자의 고유 식별자. 보통 사용자의 아이디나 로그인명으로 사용됩니다.</p>
 * <p>- password: 사용자의 비밀번호.</p>
 * <p>- nickname: 사용자의 별명.</p>
 * <p>- email: 사용자의 이메일 주소.</p>
 * <p>- userRoleEntities: 사용자의 역할 정보를 포함하는 UserRoleEntity 객체의 리스트.</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    private String id;
    private String password;
    private String nickname;
    private String email;
    private List<UserRoleEntity> userRoleEntities;
}