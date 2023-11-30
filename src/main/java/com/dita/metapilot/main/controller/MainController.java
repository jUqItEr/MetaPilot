package com.dita.metapilot.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping(value = {"/","/index","/main"})
    public String mainPage() {
        return "index.html";
    }
}
