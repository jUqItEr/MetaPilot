package com.dita.metapilot.main.controller;

import com.dita.metapilot.log.dto.SwaggerRespDto;
import com.dita.metapilot.main.entity.CmsInfoEntity;
import com.dita.metapilot.main.service.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping()
public class MainController {
    private final MainService mainService;

    @ResponseBody
    @GetMapping(value="api/info")
    public ResponseEntity<? extends SwaggerRespDto<? extends CmsInfoEntity>> getCmsInfo() {
        CmsInfoEntity entity = mainService.getCmsInfo();

        return ResponseEntity
                .ok()
                .body(new SwaggerRespDto<>(HttpStatus.OK.value(), "Success", entity));
    }
}
