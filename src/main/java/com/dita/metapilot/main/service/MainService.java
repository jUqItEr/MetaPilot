package com.dita.metapilot.main.service;

import com.dita.metapilot.main.dto.UserDto;
import com.dita.metapilot.main.entity.CmsInfoEntity;
import com.dita.metapilot.main.repository.MainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainService {
    private final MainRepository mainRepository;

    public CmsInfoEntity getCmsInfo() {
        return mainRepository.getCmsInfo();
    }

    public boolean hasBlock(UserDto dto) {
        return mainRepository.hasBlock(dto);
    }
}
