package com.dita.metapilot.comment.file.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/files")
public class FileViewController {

    @GetMapping("/view")
    public String viewFiles() {
        return "comment/sample.html";
    }
}
