package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.HandledDAO;
import com.studenthub.entity.Handled;

@Repository("handledDAO")
public class HandledDAOImpl implements HandledDAO {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public List<Handled> list() {
		String hql = "FROM HANDLED";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addHandle(Handled handle) {
		try {
			sessionFactory.getCurrentSession().save(handle);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateHandle(Handled handle) {
		try {
			sessionFactory.getCurrentSession().update(handle);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteHandle(Handled handle) {
		try {
			sessionFactory.getCurrentSession().delete(handle);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public Handled getHandle(int id) {
		return (Handled) sessionFactory.getCurrentSession().get(Handled.class, id);
	}

}
