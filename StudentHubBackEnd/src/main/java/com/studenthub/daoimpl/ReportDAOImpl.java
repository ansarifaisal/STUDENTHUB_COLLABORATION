package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.ReportDAO;
import com.studenthub.entity.Report;

@Repository("reportDAO")
public class ReportDAOImpl implements ReportDAO {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public List<Report> list() {
		String hql = "FROM REPORT";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addReport(Report report) {
		try {
			sessionFactory.getCurrentSession().save(report);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateReport(Report report) {
		try {
			sessionFactory.getCurrentSession().update(report);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteReport(Report report) {
		try {
			sessionFactory.getCurrentSession().delete(report);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public Report getReport(int id) {
		return (Report) sessionFactory.getCurrentSession().get(Report.class, id);
	}

}
