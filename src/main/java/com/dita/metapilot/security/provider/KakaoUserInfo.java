package com.dita.metapilot.security.provider;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo {
    private final Map<String, Object> attributes;
    private Map<String, Object> properties;
    private Map<String, Object> kakaoAccount;
    private Map<String, Object> profile;

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
        if (attributes.containsKey("properties") && attributes.get("properties") != null) {
            this.properties = (Map<String, Object>) attributes.get("properties");
        }
        if (attributes.containsKey("kakao_account") && attributes.get("kakao_account") != null) {
            this.kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            if (kakaoAccount.containsKey("profile") && kakaoAccount.get("profile") != null) {
                this.profile = (Map<String, Object>) kakaoAccount.get("profile");
            }
        }
    }

    @Override
    public String getSocialId() {
        Long id = (Long) attributes.get("id");
        return String.valueOf(id);
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return null;
    }

    @Override
    public String getName() {
        if (properties != null && properties.containsKey("nickname")) {
            return (String) properties.get("nickname");
        }
        return null;
    }
}
