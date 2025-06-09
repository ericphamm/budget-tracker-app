package ericphamm.reportservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    // Inject the environment variable
    @Value("${transaction.service.url}")
    private String transactionServiceUrl;

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl(transactionServiceUrl) // Use the injected variable here
                .build();
    }
}
