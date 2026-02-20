package com.admin.api.service;

import java.util.List;
import java.util.Optional;

import com.admin.api.entity.Intern;
import com.admin.api.model.InternRequest;

public interface InternService {

	Intern createIntern(InternRequest InternRequest);

	List<Intern> getAllIntern();

	Optional<Intern> getInternById(Long id);

	String deleteInternById(Long id);

	Intern updateInternById(Long id, InternRequest req);

}
