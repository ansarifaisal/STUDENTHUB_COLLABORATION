package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.BlogLikesDAO;
import com.studenthub.entity.BlogLikes;
import com.studenthub.entity.Forum;

@Repository("blogLikesDAO")
public class BlogLikesDAOImpl implements BlogLikesDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public BlogLikes getBlogLikes(int id) {
		return (BlogLikes) sessionFactory.getCurrentSession().get(BlogLikes.class, id);
	}

	@Override
	@Transactional
	public List<BlogLikes> list(int id) {
		String hql = "FROM BLOG_LIKES WHERE BLOG_ID = :blogID ORDER BY DATE_TIME DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("blogID", id);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addBlogLikes(BlogLikes blogLikes) {
		try {
			sessionFactory.getCurrentSession().save(blogLikes);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean existingLikes(int id, int userId) {
		String hql = "FROM BLOG_LIKES WHERE BLOG_ID = :blogID AND USER_ID = :userId";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("blogID", id);
		query.setParameter("userId", userId);
		System.out.println(query.list().isEmpty());
		if (query.list().isEmpty()) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteLike(BlogLikes blogLikes) {
		try {
			sessionFactory.getCurrentSession().delete(blogLikes);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
