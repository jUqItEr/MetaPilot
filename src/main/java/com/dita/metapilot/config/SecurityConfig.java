package com.dita.metapilot.config;//package com.dita.metapilot.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
///**
// * <p>Web Security 기본 설정 및 사이트 접근 허용</p>
// *
// * @author Myeongseung Kwon (@myeongseung)
// * @since 2023. 11. 21.
// * @version 1.0.0
// * */
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    /**
//     * <p>비밀번호 인코더</p>
//     *
//     * @return 비밀번호 인코더를 가져옴
//     * */
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    /**
//     * <p>권한을 적용할 페이지를 설정함</p>
//     *
//     * @exception Exception SpringSecurity에서 발생할 수 있는 예외
//     * @return 필요한 페이지 별로 권한을 적용한 체인 값을 반환함
//     * */
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf(AbstractHttpConfigurer::disable); //얘는 안됨
//        http.authorizeHttpRequests(
//                authorize -> authorize.requestMatchers("/**").permitAll() //전부 허용
//                        .anyRequest().authenticated()
//        );
//        return http.build();
//    }
//}
