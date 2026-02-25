package com.admin.api.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.api.entity.Batch;
import com.admin.api.entity.Staff;
import com.admin.api.entity.Student;
import com.admin.api.model.BatchRequest;
import com.admin.api.repository.BatchRepository;
import com.admin.api.repository.StaffRepository;
import com.admin.api.service.BatchService;
@Service
public class BatchServiceImpl  implements BatchService{
   
    
	@Autowired
	private BatchRepository batchRepository;
	
	@Autowired
	 private  StaffRepository staffRepository;

	@Autowired
	private ModelMapper modelMapper;

	  @Override
	    public Batch createBatch(BatchRequest request) {

	        // Staff time conflict check
	        if (!batchRepository.staffTimeConflict(
	                request.getStaffIds(),
	                request.getStartTime(),
	                request.getEndTime()).isEmpty()) {

	            throw new RuntimeException("Staff not available for this time");
	        }

	        // Room time conflict check
	        if (!batchRepository.roomTimeConflict(
	                request.getRoomNumber(),
	                request.getStartTime(),
	                request.getEndTime()).isEmpty()) {

	            throw new RuntimeException("Room not available for this time");
	        }

	        List<Staff> staffs = staffRepository.findAllById(request.getStaffIds());

	        if (staffs.size() != request.getStaffIds().size()) {
	            throw new RuntimeException("Invalid staff id");
	        }

	        Batch batch = new Batch();
	        batch.setBatchName(request.getBatchName());
	        batch.setStatus(request.getStatus());
	        batch.setStartTime(request.getStartTime());
	        batch.setEndTime(request.getEndTime());
	        batch.setRoomNumber(request.getRoomNumber());
	        batch.setStaffs(staffs);

	        return batchRepository.save(batch);
	    }


	@Override
	public Optional<Batch> getBatchById(Long id) {
		return batchRepository.findById(id);
	}

	@Override
	public List<Batch> getAllBatch() {
		return batchRepository.findAll();
	}

	@Override
	public Batch updateBatchById(Long id, BatchRequest batchRequest) {

		Batch existing = batchRepository.findById(id).orElse(null);

		if (existing == null) {
			return null;
		}

		// Avoid overwriting primary key
		modelMapper.typeMap(BatchRequest.class, Batch.class).addMappings(m -> m.skip(Batch::setBatchId));

		modelMapper.map(batchRequest, existing);

		return batchRepository.save(existing);
	}

	@Override
	public boolean deleteBatchById(Long id) {
		if (batchRepository.existsById(id)) {
			batchRepository.deleteById(id);
			return true;
		}
		return false;
	}
	
	
	   @Override
	    public List<Student> getStudentsByBatchId(Long batchId) {

	        Batch batch = batchRepository.findById(batchId)
	                .orElseThrow(() -> new RuntimeException("Batch not found"));

	        return batch.getStudents(); // 🔥 students list
	    }
}
