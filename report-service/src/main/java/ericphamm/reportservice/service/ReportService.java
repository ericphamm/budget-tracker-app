package ericphamm.reportservice.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ReportService {
    private final WebClient webClient;

    public ReportService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<Double> fetchTotalAmount() {
        return webClient
                .get()
                .uri("/transactions/total")
                .retrieve()
                .bodyToMono(Double.class);
    }

    public Mono<Double> fetchTotalIncome() {
        return webClient
                .get()
                .uri("/transactions/total/income")
                .retrieve()
                .bodyToMono(Double.class);
    }

    public Mono<Double> fetchTotalExpense() {
        return webClient
                .get()
                .uri("/transactions/total/expense")
                .retrieve()
                .bodyToMono(Double.class);
    }

    public Mono<Double> fetchBalance() {
        Mono<Double> incomeMono = fetchTotalIncome();
        Mono<Double> expenseMono = fetchTotalExpense();

        return Mono.zip(incomeMono, expenseMono, (income, expense) -> income - expense);
    }
}
