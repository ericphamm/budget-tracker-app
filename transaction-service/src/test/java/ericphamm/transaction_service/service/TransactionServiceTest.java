package ericphamm.transaction_service.service;

import ericphamm.transaction_service.model.Transaction;
import ericphamm.transaction_service.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


public class TransactionServiceTest {

    private TransactionService transactionService;
    private TransactionRepository mockRepository;

    @BeforeEach
    void setUp() {
        // Create a mock repository
        mockRepository = Mockito.mock(TransactionRepository.class);
        // Pass the mock into the service
        transactionService = new TransactionService(mockRepository);
    }

    @Test
    void filterByAmountRange_shouldReturnFilteredTransactions() {
        // Arrange
        Transaction tx1 = new Transaction();
        tx1.setAmount(100.0);

        Transaction tx2 = new Transaction();
        tx2.setAmount(200.0);

        List<Transaction> mockResult = List.of(tx1, tx2);
        // Mock repository call
        when(mockRepository.findByAmountBetween(100.0, 300.0)).thenReturn(mockResult);
        // Act
        List<Transaction> result = transactionService.filterByAmountRange(100.0, 300.0);
        // Assert
        assertEquals(2, result.size());
        assertEquals(100.0, result.get(0).getAmount());
        assertEquals(200.0, result.get(1).getAmount());
        // Optional: verify repo interaction
        verify(mockRepository, times(1)).findByAmountBetween(100.0,300.0);
    }

    @Test
    void getTotalAmount_shouldReturnCorrectSum() {
        //Arange
        Double mockTotal = 1234.56;
        //mock repository call
        when(mockRepository.getTotalAmount()).thenReturn(mockTotal);
        //act
        Double result = transactionService.getTotalAmount();
        //Assert
        assertEquals(mockTotal, result);
        //verify interaction
        verify(mockRepository,times(1)).getTotalAmount();
    }

    @Test
    void searchTransactions_shouldReturnCorrectTransaction() {
        //Arrange
        Transaction tx1 = new Transaction();
        tx1.setDescription("coffe");

        Transaction tx2 = new Transaction();
        tx2.setDescription("office chair");

        String keyword = "off";

        List<Transaction> mockResult = List.of(tx1,tx2);
        //mock repository call
        when(mockRepository.findByDescriptionContainingIgnoreCase(keyword)).thenReturn(mockResult);
        //act
        List<Transaction> result = transactionService.searchTransactions(keyword);
        //assert
        assertEquals(2, result.size());
        assertEquals("coffe", result.get(0).getDescription());
        assertEquals("office chair", result.get(1).getDescription());

        verify(mockRepository, times(1)).findByDescriptionContainingIgnoreCase(keyword);
    }

    @DisplayName("calculateTotalAmount() sums all amounts correctly")
    @Test
    void calculateTotalAmount_shouldReturnCorrectSum() {

        // Arrange: mock transaction data
        Transaction tx1 = new Transaction();
        tx1.setAmount(100.0);

        Transaction tx2 = new Transaction();
        tx2.setAmount(250.5);

        List<Transaction> mocTransactions = List.of(tx1, tx2);

        // Act
        double total = transactionService.calculateTotalAmount(mocTransactions);

        // Assert
        assertEquals(350.5, total);
    }

}
