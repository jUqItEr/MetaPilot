package com.dita.metapilot.main.repository;

import com.dita.metapilot.main.entity.CmsInfoEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MainRepository {
    /**
     * <p></p>
     *
     * @since 2023. 12. 01.
     * @return Cms Information Entity
     * */
    CmsInfoEntity getCmsInfo();
}
