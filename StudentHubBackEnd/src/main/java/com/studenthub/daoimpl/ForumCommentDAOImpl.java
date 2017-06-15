package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.ForumCommentDAO;
import com.studenthub.entity.ForumComment;

@Repository("forumCommentDAO")
public class ForumCommentDAOImpl implements ForumCommentDAO {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public ForumComment getForumComment(int id) {
		return (ForumComment) sessionFactory.getCurrentSession().get(ForumComment.class, id);
	}

	@Override
	@Transactional
	public List<ForumComment> list() {
		String hql = "FROM FORUM_COMMENTS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addForumComment(ForumComment forumComment) {
		try {
			sessionFactory.getCurrentSession().save(forumComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateForumComment(ForumComment forumComment) {
		try {
			sessionFactory.getCurrentSession().update(forumComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteForumComment(ForumComment forumComment) {
		try {
			sessionFactory.getCurrentSession().delete(forumComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
