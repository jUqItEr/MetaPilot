package com.dita.metapilot.security.provider;

public interface OAuth2UserInfo {

    String getSocialId();
    String getProvider();
    String getEmail();
    String getName();
}
