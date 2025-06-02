package ericphamm.transaction_service.repository;

import ericphamm.transaction_service.model.Transaction;
import ericphamm.transaction_service.model.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    //get basic CRUD methods for free(findAll, save, deleteById, etc.)
    List<Transaction> findByDescriptionContainingIgnoreCase(String keyword);

    List<Transaction> findAllByOrderByTimestampDesc();

    List<Transaction> findByAmountBetween(double min, double max);

    List<Transaction> findByDescriptionContainingIgnoreCaseAndAmountBetweenOrderByTimestampDesc(String keyword, double min, double max);

    List<Transaction> findByDescriptionContainingIgnoreCaseAndAmountBetweenAndTypeOrderByTimestampDesc(String keyword, double min, double max, TransactionType type);


    Page<Transaction> findAll(Pageable pageable);

    @Query ("SELECT SUM(t.amount) FROM Transaction t")
    Double getTotalAmount();

    List<Transaction> findByType(TransactionType type);

}
