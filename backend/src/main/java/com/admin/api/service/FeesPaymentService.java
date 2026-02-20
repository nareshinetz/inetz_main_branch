package com.admin.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.admin.api.entity.FeesPayment;
import com.admin.api.model.FeesPaymentRequest;
import com.admin.api.model.FeesSummary;

public interface FeesPaymentService {

    FeesPayment makePayment(FeesPaymentRequest request);
    
   FeesSummary getTodayFeesSummary();
   
   Page<FeesPayment> getAllPayments(int page, int size);
   
   FeesPayment getPaymentById(Long id);

   FeesPayment updatePayment(Long id, FeesPaymentRequest request);

   void deletePayment(Long id);
   List<FeesPayment> findByStudentId(String studentId);

}
