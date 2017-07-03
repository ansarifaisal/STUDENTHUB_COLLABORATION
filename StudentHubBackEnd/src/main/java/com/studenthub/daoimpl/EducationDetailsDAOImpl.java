package com.studenthub.daoimpl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.EducationDetailsDAO;
import com.studenthub.entity.EducationDetails;

@Repository("educationDetailsDAO")
public class EducationDetailsDAOImpl implements EducationDetailsDAO {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public EducationDetails get(int id) {
		return (EducationDetails) sessionFactory.getCurrentSession().get(EducationDetails.class, id);
	}

	@Override
	@Transactional
	public boolean add(EducationDetails educationDetails) {
		try {
			sessionFactory.getCurrentSession().save(educationDetails);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean update(EducationDetails educationDetails) {
		try {
			sessionFactory.getCurrentSession().update(educationDetails);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean delete(EducationDetails educationDetails) {
		try {
			sessionFactory.getCurrentSession().delete(educationDetails);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
