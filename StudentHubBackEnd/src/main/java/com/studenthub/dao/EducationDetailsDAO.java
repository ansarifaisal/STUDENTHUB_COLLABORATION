package com.studenthub.dao;

import com.studenthub.entity.EducationDetails;

public interface EducationDetailsDAO {

	EducationDetails get(int id);

	boolean add(EducationDetails educationDetails);

	boolean update(EducationDetails educationDetails);

	boolean delete(EducationDetails educationDetails);

}
