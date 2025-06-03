package ericphamm.transaction_service.controller;

import ericphamm.transaction_service.model.Transaction;
import ericphamm.transaction_service.model.TransactionType;
import ericphamm.transaction_service.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllSortedByTimestamp();
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@Valid @RequestBody Transaction transaction) {
        Transaction created = transactionService.createTransaction(transaction);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        Transaction transaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(transaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id,@Valid @RequestBody Transaction updatedTransaction) {
        Transaction updated = transactionService.updateTransaction(id, updatedTransaction);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/search")
    public List<Transaction> searchTransactions(@RequestParam String keyword) {
        return transactionService.searchTransactions(keyword);
    }

    @GetMapping("/filter")
    public List<Transaction> filerTransactions(@RequestParam double min,@RequestParam double max) {
        return transactionService.filterByAmountRange(min, max);
    }

//    @GetMapping("/paginated")
//    public Page<Transaction> getPaginatedTransactions(
//            @PageableDefault(size = 10, sort = "timestamp") Pageable pageable) {
//        return transactionService.getPaginatedTransactions(pageable);
//    }

    @GetMapping("/paginated")
    public Page<Transaction> getPaginatedTransactions(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Double min,
            @RequestParam(required = false) Double max,
            @RequestParam(required = false) TransactionType type,
            @PageableDefault(size = 10, sort = "timestamp", direction = Sort.Direction.DESC) Pageable pageable) {

        return transactionService.filterCombinedPaginated(keyword, min, max, type, pageable);
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getTotalAmount() {
        Double total = transactionService.getTotalAmount();
        return ResponseEntity.ok(total);
    }

    @GetMapping("/filter-combined")
    public List<Transaction> filterCombined(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Double min,
            @RequestParam(required = false) Double max,
            @RequestParam(required = false) TransactionType type){
        return transactionService.filterCombined(keyword, min, max, type);
    }

    @GetMapping("/type")
    public ResponseEntity<List<Transaction>> findByType(@RequestParam TransactionType type) {
        List<Transaction> transactions = transactionService.findByType(type);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/total/income")
    public ResponseEntity<Double> getTotalIncome() {
        return ResponseEntity.ok(transactionService.getTotalIncome());
    }

    @GetMapping("/total/expense")
    public ResponseEntity<Double> getTotalExpenses() {
        return ResponseEntity.ok(transactionService.getTotalExpense());
    }

}
