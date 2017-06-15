package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.ForumCategoryDAO;
import com.studenthub.entity.ForumCategory;

@Repository("forumCategoryDAO")
public class ForumCategoryDAOImpl implements ForumCategoryDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public ForumCategory getForumCategory(int id) {
		return (ForumCategory) sessionFactory.getCurrentSession().get(ForumCategory.class, id);
	}

	@Override
	@Transactional
	public List<ForumCategory> list() {
		String hql = "FROM FORUM_CATEGORIES";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addForumCategory(ForumCategory forumCategory) {
		try {
			sessionFactory.getCurrentSession().save(forumCategory);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateForumCategory(ForumCategory forumCategory) {
		try {
			sessionFactory.getCurrentSession().update(forumCategory);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteForumCategory(ForumCategory forumCategory) {
		try {
			sessionFactory.getCurrentSession().delete(forumCategory);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean findByName(String forumCategoryName) {
		
		String hql = "FROM FORUM_CATEGORIES WHERE FORUM_NAME = :forumCategoryName";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("forumCategoryName", forumCategoryName);
		return true;
	}

}
