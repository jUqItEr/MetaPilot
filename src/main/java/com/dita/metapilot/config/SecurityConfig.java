package com.dita.metapilot.config;

import com.dita.metapilot.jwt.JwtAuthenticationFilter;
import com.dita.metapilot.jwt.JwtAuthorizationFilter;
import com.dita.metapilot.security.OAuth2SuccessHandler;
import com.dita.metapilot.security.PrincipalOauth2UserService;
import com.dita.metapilot.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

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
@Configuration
@EnableWebSecurity // 시큐리티 활성화 -> 기본 스프링 필터체인에 등록
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CorsConfig corsConfig;

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Autowired
    private OAuth2SuccessHandler oAuth2SuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http

                .addFilter(corsConfig.corsFilter())
                .csrf().disable()
                //.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                //.and()
                .formLogin().disable()

                .httpBasic().disable()

                .addFilter(new JwtAuthenticationFilter(authenticationManager(), userRepository))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
                .authorizeRequests()
                .antMatchers("/api/user/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
                .antMatchers("/api/moderator/**")
                .access("hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
//                .antMatchers("/api/admin/**")
//                .access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll()
                .and()

                .oauth2Login()
                .successHandler(oAuth2SuccessHandler)
                .loginPage("http://localhost:3080/account/login")
                .userInfoEndpoint()
                .userService(principalOauth2UserService);

    }

}