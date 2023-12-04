package com.dita.metapilot.filter;

import javax.servlet.*;
import java.io.IOException;

public class MyFilter2 implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("filter2");
        chain.doFilter(request, response); //계속 진행하려면 chain에다가 다시 넘겨야함
    }
}
