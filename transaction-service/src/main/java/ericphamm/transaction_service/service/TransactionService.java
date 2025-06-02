package ericphamm.transaction_service.service;

import ericphamm.transaction_service.model.Transaction;
import ericphamm.transaction_service.model.TransactionType;
import ericphamm.transaction_service.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransaction() {
        return transactionRepository.findAll();
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public Transaction updateTransaction(Long id, Transaction updatedTransaction) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id" + id));

        existing.setDescription(updatedTransaction.getDescription());
        existing.setAmount(updatedTransaction.getAmount());
        existing.setTimestamp(LocalDateTime.now());

        return transactionRepository.save(existing);
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found" + id));
    }

    public List<Transaction> searchTransactions(String keyword) {
        return transactionRepository.findByDescriptionContainingIgnoreCase(keyword);
    }

    public List<Transaction> filterByAmountRange(double min, double max) {
        return transactionRepository.findByAmountBetween(min, max);
    }

    public List<Transaction> filterCombined(String keyword, Double min, Double max, TransactionType type) {
        if (keyword == null) keyword = "";
        if (min == null) min = 0.0;
        if (max == null) max = Double.MAX_VALUE;

        if (type != null) {
            return transactionRepository.findByDescriptionContainingIgnoreCaseAndAmountBetweenAndTypeOrderByTimestampDesc(
                    keyword, min, max, type);
        }

        return transactionRepository.findByDescriptionContainingIgnoreCaseAndAmountBetweenOrderByTimestampDesc(
                keyword, min, max);
    }

    public Page<Transaction> getPaginatedTransactions(Pageable pageable) {
        return transactionRepository.findAll(pageable);
    }

    public Double getTotalAmount() {
        return transactionRepository.getTotalAmount();
    }

    public List<Transaction> findByType(TransactionType type) {
        return transactionRepository.findByType(type);
    }

    public List<Transaction> getAllSortedByTimestamp() {
        return transactionRepository.findAllByOrderByTimestampDesc();
    }

}
