package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.JobDAO;
import com.studenthub.entity.Job;

@Repository("jobDAO")
public class JobDAOImpl implements JobDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public Job getJob(int id) {
		return (Job) sessionFactory.getCurrentSession().get(Job.class, id);
	}

	@Override
	@Transactional
	public List<Job> list() {
		String hql = "FROM JOBS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addJob(Job job) {
		try {
			sessionFactory.getCurrentSession().save(job);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateJob(Job job) {
		try {
			sessionFactory.getCurrentSession().update(job);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteJob(Job job) {
		try {
			sessionFactory.getCurrentSession().delete(job);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public List<Job> listAllPendingJobs() {
		String hql = "FROM JOBS WHERE STATUS = 'PENDING'";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public List<Job> getLatestJobs() {
		String hql = "FROM JOBS WHERE STATUS = 'APPROVED' ORDER BY POST_DATE DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setMaxResults(5);
		return query.list();
	}

	@Override
	@Transactional
	public List<Job> getCreatedJobs(int userID) {
		String hql = "FROM JOBS WHERE USER_ID = :userID AND STATUS = 'APPROVED' ORDER BY POST_DATE DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("userID", userID);
		return query.list();
	}

}
