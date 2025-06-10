package ericphamm.transaction_service.controller;

import ericphamm.transaction_service.model.Transaction;
import ericphamm.transaction_service.service.TransactionService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(TransactionController.class)
class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService transactionService;

    @Test
    void testGetAllTransactions_returnsOk() throws Exception {
        Transaction mockTx = new Transaction();
        mockTx.setId(1L);
        mockTx.setDescription("Test");
        mockTx.setAmount(BigDecimal.valueOf(100.0));

        Mockito.when(transactionService.getAllSortedByTimestamp())
                .thenReturn(List.of(mockTx));

        mockMvc.perform(get("/transactions"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("Test"));
    }

    @DisplayName("Should create a new transaction")
    @Test
    void testCreateTransaction_returnsCreated() throws Exception {
        Transaction mockTx = new Transaction();
        mockTx.setId(1L);
        mockTx.setDescription("Created Tx");
        mockTx.setAmount(BigDecimal.valueOf(123.45));

        Mockito.when(transactionService.createTransaction(Mockito.any()))
                .thenReturn(mockTx);

        String json = """
        {
          "description": "Created Tx",
          "amount": 123.45,
          "type": "EXPENSE"
        }
    """;

        mockMvc.perform(post("/transactions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.description").value("Created Tx"));
    }

    @DisplayName("Should delete a transaction")
    @Test
    void testDeleteTransaction_returnsNoContent() throws Exception {
        mockMvc.perform(delete("/transactions/1"))
                .andExpect(status().isNoContent());

        Mockito.verify(transactionService).deleteTransaction(1L);
    }

}