package com.dita.metapilot.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.dita.metapilot.jwt.JwtProperties;
import com.dita.metapilot.user.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        UserEntity user = principalDetails.getUser();
        System.out.println(user); //TODo

        String jwtAccessToken = JWT.create()
                .withSubject(user.getId())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.ACCESS_TIME))
                .withClaim("username", user.getId())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        System.out.println(jwtAccessToken);//TODO
        //response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtAccessToken);
        response.sendRedirect("http://localhost:3080/account/loginOauth2?token=" + URLEncoder.encode(jwtAccessToken));
        System.out.println(response); //TODO

    }
}
