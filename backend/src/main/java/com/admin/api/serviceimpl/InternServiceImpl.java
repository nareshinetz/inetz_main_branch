package com.admin.api.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.api.entity.Intern;
import com.admin.api.model.InternRequest;
import com.admin.api.repository.InternRepository;
import com.admin.api.service.InternService;

@Service
public class InternServiceImpl implements InternService {

	@Autowired
	private InternRepository internRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Intern createIntern(InternRequest internRequest) {

		Intern internEntity = modelMapper.map(internRequest, Intern.class);
		return internRepository.save(internEntity);
	}

	@Override
	public List<Intern> getAllIntern() {

		return internRepository.findAll();
	}

	@Override
	public Optional<Intern> getInternById(Long id) {

		return internRepository.findById(id);
	}

	@Override
	public String deleteInternById(Long id) {

		if (internRepository.existsById(id)) {
			internRepository.deleteById(id);
			return "Student deleted successfully with ID: " + id;
		} else {
			return "Student not found with ID: " + id;
		}
	}

	@Override
	public Intern updateInternById(Long id, InternRequest req) {

		Intern existingIntern = internRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Intern not found with ID: " + id));

		// map only non-null fields from request → existingIntern
		modelMapper.map(req, existingIntern);

		Intern updatedIntern = internRepository.save(existingIntern);

		return updatedIntern;
	}

}

