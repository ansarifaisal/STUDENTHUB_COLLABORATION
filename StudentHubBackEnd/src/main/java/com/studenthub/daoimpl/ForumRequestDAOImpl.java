package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.ForumRequestDAO;
import com.studenthub.entity.ForumRequest;

@Repository("forumRequestDAO")
public class ForumRequestDAOImpl implements ForumRequestDAO{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public ForumRequest getForumRequest(int id) {
		return (ForumRequest) sessionFactory.getCurrentSession().get(ForumRequest.class, id);
	}

	@Override
	@Transactional
	public List<ForumRequest> list() {
		String hql = "FROM FORUM_REQUEST";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addForumRequest(ForumRequest forumRequest) {
		try {
			sessionFactory.getCurrentSession().save(forumRequest);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteForumRequest(ForumRequest forumRequest) {
		try {
			sessionFactory.getCurrentSession().delete(forumRequest);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
