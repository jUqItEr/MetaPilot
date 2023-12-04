package com.dita.metapilot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * <p>WebMvcConfig</p>
 *
 * @author Myeongseung Kwon (@myeongseung)
 * @version 1.0.0
 * @since 23.11.21
 *
 * */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    /**
     * <p>리소스 공유 정책 설정</p>
     *
     * @param registry 교차 출처 리소스 공유 등록 변수
     *
     * */
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/api/**")
//                .allowedOrigins("*") // 허용할 오리진들: 여기서는 모든 오리진 허용
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // 허용할 HTTP 메소드
//                .allowedHeaders("*") // 허용할 헤더들
//                .allowCredentials(true); // 쿠키를 포함한 요청 허용
//    }
}
