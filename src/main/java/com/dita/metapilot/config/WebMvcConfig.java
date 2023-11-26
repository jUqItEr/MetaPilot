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
 * */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    /**
     * <p>리소스 공유 정책 설정</p>
     *
     * @param registry 교차 출처 리소스 공유 등록 변수
     * */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("*")    // 요청 End Point
                .allowedMethods("*")          // 메소드 허용
                .allowedOrigins("*");         // 서버 허용
    }
}
