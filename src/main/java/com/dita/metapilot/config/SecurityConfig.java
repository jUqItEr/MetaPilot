package com.dita.metapilot.config;

import com.dita.metapilot.jwt.JwtAuthenticationFilter;
import com.dita.metapilot.security.PrincipalOauth2UserService;
import com.dita.metapilot.filter.MyFilter3;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;

// 1. 코드 받기(인증)
// 2. 엑세스토큰(권한)
// 3. 사용자 프로필 정보 가져오기
// 4. 그 정보를 토대로 회원가입 진행

/**
 * <p>SecurityConfig 페이지 접근권한, 로그인, 소셜로그인 담당</p>
 *
 * @author Myeongseung Kwon (@myeongseung)
 * @version 1.0.0
 * @since 23.11.21
 *
 * */
@EnableWebSecurity //시큐리티 활성화
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PrincipalOauth2UserService principalOauth2UserService;

    /**
     * <p>Bean 생성</p>
     *
     * 비밀번호 암호화에 사용되는 BCryptPasswordEncoder 인스턴스를 반환
     * @return BCryptPasswordEncoder 인스턴스.
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 정적 리소스에 대한 보안 요구사항을 무시하도록 설정
     * @param web WebSecurity 인스턴스
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    /**
     * <p>HttpSecurity를 사용한 보안 설정.</p>
     * <p>- CSRF 보호를 비활성화</p>
     * <p>- HTTP 기본 인증을 비활성화</p>
     * <p>- 특정 경로에 대한 접근 권한을 설정합니다. </p>
     * <p>(지금은 전부 앵간한거 전부 허용 -> 페이지 완성 이후 수정 예정)</p>
     * <p>- 로그인 페이지와 성공, 실패 URL 설정</p>
     * <p>(로그인 성공시 index.html 실패시 다시 login 페이지 돌아가게 설정)</p>
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //시큐리티 필터와 우리가 만든 필터 순서 확인용 시큐리티 필터가 제일 먼저 실행 Before After 모두 우리가만든거보다빠르다.
        http.addFilterBefore(new MyFilter3(), SecurityContextPersistenceFilter.class); //필터1 SecurityContextPersistenceFilter 전에 MyFilter3을 건다. (안쓴다!)
        http.csrf().disable(); //
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션을 사용하지않고 stateless방식을 이용
                .and()
                .formLogin().disable()  // form 태그 만들어서 로그인 안하겠다
                .httpBasic().disable() //
                .addFilter(new JwtAuthenticationFilter(authenticationManager())); //AuthenticationManager
        http.authorizeRequests()
                .antMatchers("api/v1/user/**") //(jwt)
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')") //(jwt)
                .antMatchers("api/v1/moderator/**") //(jwt)
                .access("hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')") //(jwt)
                .antMatchers("api/v1/admin/**") //(jwt)
                .access("hasRole('ROLE_ADMIN')") //(jwt)
                .antMatchers("/mypage/**", "/security/**") //인증이 되면 들어갈 수 있는 주소
                .authenticated()
                .antMatchers("/admin/**")
                .hasRole("ADMIN")   // ROLE_ADMIN, ROLE_MANAGER
                .anyRequest()
                .permitAll();

        //기본적은 로그인 방식을 아예 안씀
        // .formLogin().disable()
//            .formLogin().disable()
//                .loginPage("/user/login") // 로그인 페이지 get요청
//                .loginProcessingUrl("/user/login") // 로그인 인증 post 요청
//                .failureForwardUrl("/user/login") // 실패시 넘어가는 페이지
//                .defaultSuccessUrl("/index") //로그인 성공시 넘어가는 페이지
//                .and()

//            .oauth2Login()
//                .loginPage("/user/login")
//                .userInfoEndpoint()
//                .userService(principalOauth2UserService); //구글 로그인이 완료된 후 처리
    }

}