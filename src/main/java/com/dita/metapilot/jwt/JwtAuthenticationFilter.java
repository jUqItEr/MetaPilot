package com.dita.metapilot.jwt;

import com.auth0.jwt.algorithms.Algorithm;
import com.dita.metapilot.security.PrincipalDetails;
import com.dita.metapilot.user.entity.UserEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
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

// 스프링 시큐리티에서 UsernamePasswordAuthenticationFilter 가 있음.
// localhost:8000/login 요청해서 userId, password (POST 전송)
// UsernamePasswordAuthenticationFilter 얘가 동작

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    // login 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter : login ing.....");

        // 1. id, password 받아서
        try {
//            BufferedReader br = request.getReader();
//
//            String input = null;
//            while((input = br.readLine()) != null) {
//                System.out.println(input); //id=sibal112&password=1234 ==> {"id":"sibal122", "password": "1234"}
//            }
            ObjectMapper om = new ObjectMapper();
            UserEntity user = om.readValue(request.getInputStream(), UserEntity.class);
            System.out.println(user);

            // 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user.getId(), user.getPassword());
            
            // PrincipalDetailsService loadUserByUsername() 함수가 실행된 후 정상이면 authentication이 리턴됨
            // authentication 속에 내 로그인 정보가 담김
            // DB에 있는 id랑 password가 같다.
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // authentication 객체가 session 영역에 저장됨. => 로그인이 되었다는 뜻.
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료됨 ? "+principalDetails.getUser().getId());
            System.out.println("userEntity : " + user);
            // authentication 객체가 session 영역에 저장을 해야하고 그 방법은 return 으로 끝
            // return의 이유는 권한 관리를 security가 대신 해주기 때문에 편하려고 하는거.
            // 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음. 근데 권한 처리때문에 session을 넣어 준다.
            return authentication;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // 2. 정상인지 로그인 시도를 한다. authenticationManager로 로그인 시도를 하면 PrincipalDetailsService가 호출
        // 3. PrincipalDetailsService가 속의 loadUserByUsername() 함수 실행
        // 4. PrincipalDetails를 session에 담고 (세션에 안담을거면 권한 관리가 필요없긴함 하지만 우린 권한이 있으니까 거쳐야함)
        // 5. JWT 토큰을 만들어서 응답해주면 끝
    }

    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수 실행
    // JWT 토큰을 만들어서 request요청한 사용자에게 JWT 토큰을 response 해주면 됨.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행됨 : 인증이 완료되었다는 뜻");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        //RSA 방식이 아닌 Hash 암호방식 이방식을 더 많이 쓴다고 하심
        String jwtToken = JWT.create()
                .withSubject("cos토큰") // 토큰이름 (크게 의미 x)
                .withExpiresAt(new Date(System.currentTimeMillis()+(60000*5))) //만료 시간 5분으로 설정(명승's 마음임 ㅎ)
                .withClaim("username", principalDetails.getUser().getId()) // 토큰에 아이디만 넣는다.
                .sign(Algorithm.HMAC512("cos"));

        response.addHeader("Authorization","Bearer " + jwtToken); //Header에 담겨서 응답이됨. 사용자에게
    }
}
