package ericphamm.reportservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import ericphamm.reportservice.service.ReportService;

@RestController
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/report/total")
    public Mono<Double> getTotalAmount() {
        return reportService.fetchTotalAmount();
    }

    @GetMapping("/report/income")
    public Mono<Double> getIncome() {
        return reportService.fetchTotalIncome();
    }

    @GetMapping("/report/expense")
    public Mono<Double> getExpense() {
        return reportService.fetchTotalExpense();
    }

    @GetMapping("/report/balance")
    public Mono<Double> getBalance() {
        return reportService.fetchBalance();
    }
}
