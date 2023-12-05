package com.dita.metapilot.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MyFilter3 implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        // 토큰 : 코스 만 받게처리 id, pw 정상적으로 들어와서 로그인이 완료 되면 토큰을 만들어주고 그걸 응답을 해준다.
        // 요청할 때 마다 header에 Authorization에 value값으로 토큰을 가지고 옴
        // 그때 토큰이 넘어 오면 이 토큰이 내가 만든 토큰이 맞는지만 검증 하면 됨. (RSA, HS256)
        if (req.getMethod().equals("POST")) {
            System.out.println("POST success");
            String headerAuth = req.getHeader("Authorization");
            System.out.println(headerAuth); //초기 null

            if (headerAuth.equals("cos")) {
                chain.doFilter(req, res); //계속 진행하려면 chain에다가 다시 넘겨야함
            }else {
                PrintWriter out = res.getWriter();
                out.println("token faild");
            }
        }
    }
}
