package com.backend.Microservice2.config;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "allowed")
public class CorsProperties {
    private List<String> url;

    public List<String> getUrl() {
        return url;
    }

    public void setUrl(List<String> url) {
        this.url = url;
    }

    public boolean isWildcard() {
        return url != null && url.size() == 1 && "*".equals(url.get(0));
    }
}
