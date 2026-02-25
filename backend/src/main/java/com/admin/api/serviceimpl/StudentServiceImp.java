package com.admin.api.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.admin.api.entity.Batch;
import com.admin.api.entity.Course;
import com.admin.api.entity.Student;
import com.admin.api.entity.StudentFees;
import com.admin.api.model.StudentRequest;
import com.admin.api.repository.BatchRepository;
import com.admin.api.repository.CourseRepository;
import com.admin.api.repository.StudentFeesRepository;
import com.admin.api.repository.StudentRepository;
import com.admin.api.service.StudentService;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class StudentServiceImp implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private StudentFeesRepository feesRepo;
    
    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Student createStudent(StudentRequest request) {

        // 1️⃣ Email & Phone validation
        if (studentRepository.existsByEmailId(request.getEmailId()))
            throw new RuntimeException("Email already exists");

        if (studentRepository.existsByPhoneNumber(request.getPhoneNumber()))
            throw new RuntimeException("Phone already exists");

        // 2️⃣ Get Course
        Course course = courseRepo.findByCourseName(request.getCourseName())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // 3️⃣ Get Batch (DIRECT Long – no conversion)
        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        // 4️⃣ Generate Student ID
        long count = studentRepository
                .countByProgramTypeAndCourse_CourseName(
                        request.getProgramType(),
                        request.getCourseName()) + 1;

        String studentId = "I"
                + getProgramCode(request.getProgramType())
                + getDomainCode(request.getCourseName())
                + String.format("%04d", count);

        // 5️⃣ Map Student & set relations
        Student student = mapper.map(request, Student.class);
        student.setId(studentId);
        student.setCourse(course);
        student.setBatch(batch);   // ⭐ THIS LINE STORES batch_id

        // 6️⃣ Save Student
        Student savedStudent = studentRepository.save(student);

        // 7️⃣ Fees Calculation
        Double totalFees = course.getPrice();
        Double discount = request.getDiscount() == null ? 0.0 : request.getDiscount();

        if (discount > totalFees)
            throw new RuntimeException("Discount cannot exceed total fees");

        Double actualFees = totalFees - discount;

        // 8️⃣ Create StudentFees
        StudentFees fees = new StudentFees();
        fees.setStudent(savedStudent);
        fees.setTotalFees(totalFees);
        fees.setActualFees(actualFees);
        fees.setPaidAmount(0.0);
        fees.setPendingAmount(actualFees);
        fees.setStatus("PENDING");

        feesRepo.save(fees);

        return savedStudent;
    }

	@Override
	public Optional<Student> getStudentById(String id) {
		return studentRepository.findById(id);
	}

	@Override
	public Student updateStudentById(String id, StudentRequest request) {
		Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));

		mapper.map(request, student);
		return studentRepository.save(student);
	}

	@Override
	public boolean deleteStudentById(String id) {
		if (!studentRepository.existsById(id))
			return false;
		studentRepository.deleteById(id);
		return true;
	}

	@Override
	public Page<Student> getAllStudents(int page, int size) {
		return studentRepository.findAll(PageRequest.of(page - 1, size));
	}

	// searching
	@Override
	public List<Student> searchByName(String name) {
		return studentRepository.findByStudentNameContainingIgnoreCase(name);
	}

	private String getProgramCode(String type) {
		if (type.equalsIgnoreCase("course"))
			return "C";
		if (type.equalsIgnoreCase("internship"))
			return "I";
		if (type.equalsIgnoreCase("project"))
			return "P";
		return "X";
	}

	private String getDomainCode(String name) {
		if (name.equalsIgnoreCase("javafullstack"))
			return "JF";
		if (name.equalsIgnoreCase("pythonfullstack"))
			return "PY";
		if (name.equalsIgnoreCase("datascience"))
			return "DS";
		if (name.equalsIgnoreCase("mernstack"))
			return "MS";
		return "GN";
	}

}    