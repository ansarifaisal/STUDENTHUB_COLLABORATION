package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.ForumDAO;
import com.studenthub.entity.Forum;

@Repository("forumDAO")
public class ForumDAOImpl implements ForumDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public Forum getForum(int id) {
		return (Forum) sessionFactory.getCurrentSession().get(Forum.class, id);
	}

	@Override
	@Transactional
	public List<Forum> list() {
		String hql = "FROM FORUMS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addForum(Forum forum) {
		try {
			sessionFactory.getCurrentSession().save(forum);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateForum(Forum forum) {
		try {
			sessionFactory.getCurrentSession().update(forum);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteForum(Forum forum) {
		try {
			sessionFactory.getCurrentSession().delete(forum);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public List<Forum> getAllPendingForums() {
		String hql = "FROM FORUMS WHERE STATUS = 'PENDING' ORDER BY FORUM_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public List<Forum> getCreatedForums(int userID) {
		String hql = "FROM FORUMS WHERE USER_ID = " + userID + " ORDER BY FORUM_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public List<Forum> getLatestForums() {
		String hql = "FROM FORUMS WHERE STATUS = 'APPROVED' ORDER BY FORUM_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setMaxResults(5);
		return query.list();
	}

}
