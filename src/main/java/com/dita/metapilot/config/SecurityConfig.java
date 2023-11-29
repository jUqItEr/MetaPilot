package com.dita.metapilot.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * <p>SecurityConfig 페이지 접근권한, 로그인, 소셜로그인 담당</p>
 *
 * @author Myeongseung Kwon (@myeongseung)
 * @version 1.0.0
 * @since 23.11.21
 *
 * */
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

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
        http.csrf().disable();
        http.httpBasic().disable();
        http.authorizeRequests()
                .antMatchers("/mypage/**", "/security/**")
                .authenticated()
                .antMatchers("/admin/**")
                .hasRole("ADMIN")   // ROLE_ADMIN, ROLE_MANAGER
                .anyRequest()
                .permitAll()
                .and()

            .formLogin()
                .loginPage("/user/login") // 로그인 페이지 get요청
                .loginProcessingUrl("/user/login") // 로그인 인증 post 요청
                .failureForwardUrl("/user/login") // 실패시 넘어가는 페이지
                .defaultSuccessUrl("/index"); //로그인 성공시 넘어가는 페이지
//                .and()

//            .oauth2Login()
//                .successHandler(oAuth2SuccessHandler)
//                .userInfoEndpoint()
//                .userService(principalUserDetailsService);
    }

}