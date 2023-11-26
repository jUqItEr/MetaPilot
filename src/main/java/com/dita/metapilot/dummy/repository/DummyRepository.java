package com.dita.metapilot.dummy.repository;

import org.apache.ibatis.annotations.Mapper;

/**
 * <p>Dummy Service for showing test sample. </p>
 * <p>This interface will communication with Mybatis library.</p>
 *
 * @deprecated
 * @author Kiseok Kang (@jUqItEr)
 * @since 2023. 11. 21.
 * @version 1.0.0
 * */
@Mapper
public interface DummyRepository {
    /**
     * Dummy method.
     */
    void foobar();
}
