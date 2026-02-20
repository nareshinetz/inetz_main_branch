package com.admin.api.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.api.entity.FeesPayment;
import com.admin.api.entity.StudentFees;
import com.admin.api.model.FeesPaymentRequest;
import com.admin.api.model.FeesSummary;
import com.admin.api.repository.FeesPaymentRepository;
import com.admin.api.repository.StudentFeesRepository;
import com.admin.api.service.FeesPaymentService;

@Service
@Transactional
public class FeesPaymentServiceImpl implements FeesPaymentService {

    @Autowired
    private FeesPaymentRepository paymentRepo;

    @Autowired
    private StudentFeesRepository feesRepo;

    // ================= CREATE PAYMENT =================
    @Override
    public FeesPayment makePayment(FeesPaymentRequest request) {

        StudentFees fees = feesRepo.findByStudentId(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Double newPaid = fees.getPaidAmount() + request.getPaidAmount();
        Double newPending = fees.getActualFees() - newPaid;

        if (newPending < 0)
            throw new RuntimeException("Over payment not allowed");

        fees.setPaidAmount(newPaid);
        fees.setPendingAmount(newPending);
        fees.setStatus(newPending == 0 ? "COMPLETED" : "PENDING");

        feesRepo.save(fees);

        FeesPayment payment = new FeesPayment();
        payment.setStudentFees(fees);
        payment.setStudentId(fees.getStudent().getId());
        payment.setStudentName(fees.getStudent().getStudentName());
        payment.setPaidAmount(request.getPaidAmount());
        payment.setPaymentDate(LocalDate.now());
        payment.setPaymentMode(request.getPaymentMode());

        return paymentRepo.save(payment);
    }

    // ================= GET PAYMENT BY ID =================
    @Override
    public FeesPayment getPaymentById(Long id) {
        return paymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
    }

    // ================= UPDATE PAYMENT =================
    @Override
    public FeesPayment updatePayment(Long id, FeesPaymentRequest request) {

        FeesPayment existingPayment = paymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));

        StudentFees fees = existingPayment.getStudentFees();

        // rollback old payment + apply new payment
        Double updatedPaid = fees.getPaidAmount()
                - existingPayment.getPaidAmount()
                + request.getPaidAmount();

        Double updatedPending = fees.getActualFees() - updatedPaid;

        if (updatedPending < 0)
            throw new RuntimeException("Over payment not allowed");

        fees.setPaidAmount(updatedPaid);
        fees.setPendingAmount(updatedPending);
        fees.setStatus(updatedPending == 0 ? "COMPLETED" : "PENDING");

        feesRepo.save(fees);

        existingPayment.setPaidAmount(request.getPaidAmount());
        existingPayment.setPaymentMode(request.getPaymentMode());

        return paymentRepo.save(existingPayment);
    }

    // ================= DELETE PAYMENT =================
    @Override
    public void deletePayment(Long id) {

        FeesPayment payment = paymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));

        StudentFees fees = payment.getStudentFees();

        // rollback deleted payment
        Double updatedPaid = fees.getPaidAmount() - payment.getPaidAmount();
        Double updatedPending = fees.getActualFees() - updatedPaid;

        fees.setPaidAmount(updatedPaid);
        fees.setPendingAmount(updatedPending);
        fees.setStatus(updatedPending == 0 ? "COMPLETED" : "PENDING");

        feesRepo.save(fees);
        paymentRepo.delete(payment);
    }

    // ================= TODAY FEES SUMMARY =================
    @Override
    public FeesSummary getTodayFeesSummary() {

        LocalDate today = LocalDate.now();

        Long totalStudents = paymentRepo.totalStudentsPaidByDate(today);
        Double totalCollection = paymentRepo.totalCollectionByDate(today);
        Double cashCollection = paymentRepo.totalCollectionByMode(today, "CASH");
        Double gpayCollection = paymentRepo.totalCollectionByMode(today, "GPay");
        Double accountTransferCollection = paymentRepo.totalCollectionByMode(today, "ACCOUNT_TRANSFER");

        totalCollection = totalCollection == null ? 0.0 : totalCollection;
        cashCollection = cashCollection == null ? 0.0 : cashCollection;
        gpayCollection = gpayCollection == null ? 0.0 : gpayCollection;
        accountTransferCollection = accountTransferCollection == null ? 0.0 : accountTransferCollection;

        return new FeesSummary(
                totalStudents,
                totalCollection,
                cashCollection,
                gpayCollection,
                accountTransferCollection
        );
    }

    // ================= GET ALL PAYMENTS (PAGINATION) =================
    @Override
    public Page<FeesPayment> getAllPayments(int page, int size) {

        Pageable pageable = PageRequest.of(page - 1, size);
        return paymentRepo.findAll(pageable);
    }
    @Override
    public List<FeesPayment> findByStudentId(String studentId) {
        return paymentRepo.findByStudentId(studentId);
    }
}
