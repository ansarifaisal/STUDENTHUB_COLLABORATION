package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.JobAppliedDAO;
import com.studenthub.entity.JobApplied;

@Repository("jobAppliedDAO")
public class JobAppliedDAOImpl implements JobAppliedDAO{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public List<JobApplied> list() {
	
		String hql = "FROM FRIENDS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
		
	}

	@Override
	@Transactional
	public boolean addJobApplied(JobApplied jobApplied) {
		try {
			sessionFactory.getCurrentSession().save(jobApplied);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteJobApplied(JobApplied jobApplied) {
		try {
			sessionFactory.getCurrentSession().delete(jobApplied);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public JobApplied getJobApplied(int id) {
		return (JobApplied) sessionFactory.getCurrentSession().get(JobApplied.class, id);
	}
}
