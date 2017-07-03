package com.studenthub.daoimpl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.SocialLinksDAO;
import com.studenthub.entity.SocialLinks;

@Repository("socialLinksDAO")
public class SocialLinksDAOImpl implements SocialLinksDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public SocialLinks get(int id) {
		return (SocialLinks) sessionFactory.getCurrentSession().get(SocialLinks.class, id);
	}

	@Override
	@Transactional
	public boolean add(SocialLinks socialLinks) {
		try {
			sessionFactory.getCurrentSession().save(socialLinks);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean update(SocialLinks socialLinks) {
		try {
			sessionFactory.getCurrentSession().update(socialLinks);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean delete(SocialLinks socialLinks) {
		try {
			sessionFactory.getCurrentSession().delete(socialLinks);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
