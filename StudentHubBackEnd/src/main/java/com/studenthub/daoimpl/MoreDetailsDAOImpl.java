package com.studenthub.daoimpl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.MoreDetailsDAO;
import com.studenthub.entity.MoreDetails;

@Repository("moreDetailsDAO")
public class MoreDetailsDAOImpl implements MoreDetailsDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public MoreDetails get(int id) {
		return (MoreDetails) sessionFactory.getCurrentSession().get(MoreDetails.class, id);
	}

	@Override
	@Transactional
	public boolean add(MoreDetails moreDetails) {
		try {
			sessionFactory.getCurrentSession().save(moreDetails);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean update(MoreDetails moreDetails) {
		try {
			sessionFactory.getCurrentSession().update(moreDetails);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean delete(MoreDetails moreDetails) {
		try {
			sessionFactory.getCurrentSession().delete(moreDetails);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
