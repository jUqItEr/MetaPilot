package com.dita.metapilot.jwt;

import com.auth0.jwt.algorithms.Algorithm;
import com.dita.metapilot.security.PrincipalDetails;
import com.dita.metapilot.user.dto.LoginRequestDto;
import com.dita.metapilot.user.dto.TokenDto;
import com.dita.metapilot.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.el.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;


/**
 * <p>스프링 시큐리티에서 UsernamePasswordAuthenticationFilter 가 있음</p>
 * <p>localhost:8000/login 요청해서 userId, password (POST 전송)</p>
 * <p>UsernamePasswordAuthenticationFilter 얘가 동작</p>
 *
 * @author 권명승 (@myeongseung)
 * @since 2023. 12. 02.
 * @version 1.0.0
 * */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    private final AuthenticationManager authenticationManager;

    // Authentication 객체 만들어서 리턴 => 의존 : AuthenticationManager
    // 인증 요청시에 실행되는 함수 => /login


    private final UserRepository userRepository;

    /**
     * <p>사용자 이름과 비밀번호를 추출하려 토큰 객체를 생성하고 </p>
     * <p></p>AuthenticationManager에 전달하여 사용자를 인증</p>
     *
     * @author 권명승 (@myeongseung)
     * @since 2023. 12. 02.
     * @version 1.0.0
     * */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        System.out.println("JwtAuthenticationFilter : 진입");

        // request에 있는 username과 password를 파싱해서 자바 Object로 받기
        ObjectMapper om = new ObjectMapper();
        LoginRequestDto loginRequestDto = null;
        try {
            loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("JwtAuthenticationFilter : " + loginRequestDto); //TODO

        // username password 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getId(),
                        loginRequestDto.getPassword());

        System.out.println("JwtAuthenticationFilter : 토큰생성완료"); //TODO

        // authenticate() 함수가 호출 되면 인증 프로바이더가 유저 디테일 서비스의
        // loadUserByUsername(토큰의 첫번째 파라메터) 를 호출하고
        // UserDetails를 리턴받아서 토큰의 두번째 파라메터(credential)과
        // UserDetails(DB값)의 getPassword()함수로 비교해서 동일하면
        // Authentication 객체를 만들어서 필터체인으로 리턴해준다.

        // Tip: 인증 프로바이더의 디폴트 서비스는 UserDetailsService 타입
        // Tip: 인증 프로바이더의 디폴트 암호화 방식은 BCryptPasswordEncoder
        // 결론은 인증 프로바이더에게 알려줄 필요가 없음.
        Authentication authentication =
                authenticationManager.authenticate(authenticationToken);

        PrincipalDetails principalDetailis = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("Authentication : "+principalDetailis.getUser().getId()); //TODO
        return authentication;
    }

    // JWT Token 생성해서 response에 담아주기
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        PrincipalDetails principalDetailis = (PrincipalDetails) authResult.getPrincipal();

        String jwtAccessToken = JWT.create()
                .withSubject(principalDetailis.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.ACCESS_TIME))
                .withClaim("username", principalDetailis.getUser().getId())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        String jwtRefreshToken = JWT.create()
                .withSubject(principalDetailis.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))
                .withClaim("username", principalDetailis.getUser().getId())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtAccessToken);

        if (userRepository.findUserToken(principalDetailis.getUser().getId()) == 0) {
            TokenDto tokenDto = new TokenDto();

            tokenDto.setId(principalDetailis.getUser().getId());
            tokenDto.setAccessToken(jwtAccessToken);
            tokenDto.setRefreshToken(jwtRefreshToken);
            userRepository.createToken(tokenDto);
        }else {
            System.out.println("이미 존재합니다.");
        }

        System.out.println("Jwt Properties : " + JwtProperties.HEADER_STRING +  JwtProperties.TOKEN_PREFIX+jwtAccessToken); //TODO
    }

}