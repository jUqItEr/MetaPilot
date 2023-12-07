package com.dita.metapilot.security;

import com.dita.metapilot.security.provider.GoogleUserInfo;
import com.dita.metapilot.security.provider.NaverUserInfo;
import com.dita.metapilot.security.provider.OAuth2UserInfo;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.entity.UserRoleEntity;
import com.dita.metapilot.user.repository.SocialRepository;
import com.dita.metapilot.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;


@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private SocialRepository socialRepository;

    @Autowired
    private UserRepository userRepository;

    // userRequest 는 code를 받아서 accessToken을 응답 받은 객체
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest); // google의 회원 프로필 조회

        // code를 통해 구성한 정보
        System.out.println("userRequest clientRegistration : " + userRequest.getClientRegistration());//TODO
        // token을 통해 응답받은 회원정보

        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        // Attribute를 파싱해서 공통 객체로 묶는다. 관리가 편함.
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")){
            oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
        } else {
            System.out.println("우리는 구글과 페이스북만 지원해요 ㅎㅎ");//TODO
        }

        Optional<UserEntity> userOptional =
                userRepository.findByProviderAndProviderId(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getSocialId());

        UserEntity user;
        String userId = oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getSocialId();
        if (userOptional.isPresent()) {
            user = userOptional.get();
            // user가 존재하면 update 해주기
            userRepository.userVisit(userId); //유저 방문시각 업데이트
        } else {
            // user의 패스워드가 null이기 때문에 OAuth 유저는 일반적인 로그인을 할 수 없음.
            System.out.println("OAuth first login!!");
            UserRoleEntity userRoleEntity = new UserRoleEntity();

            userRoleEntity.setRoleId(1);

            user = UserEntity.builder()
                    .id(oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getSocialId())
                    .email(oAuth2UserInfo.getEmail())
                    .nickname(oAuth2UserInfo.getName())
                    .provider(oAuth2UserInfo.getProvider())
                    .socialId(oAuth2UserInfo.getEmail())
                    .userRoleEntities(userRoleEntity)
                    .build();
            socialRepository.createUser(user); //소셜 회원가입
            socialRepository.createRole(user); //소셜 권한추가

        }

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
}