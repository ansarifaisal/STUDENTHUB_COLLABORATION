package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.BlogDAO;
import com.studenthub.entity.Blog;

@Repository("blogDAO")
public class BlogDAOImpl implements BlogDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public Blog getBlog(int id) {
		return (Blog) sessionFactory.getCurrentSession().get(Blog.class, id);
	}

	@Override
	@Transactional
	public List<Blog> list() {
		String hql = "FROM BLOGS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addBlog(Blog blog) {
		try {
			sessionFactory.getCurrentSession().save(blog);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateBlog(Blog blog) {
		try {
			sessionFactory.getCurrentSession().update(blog);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@Override
	@Transactional
	public boolean deleteBlog(Blog blog) {
		try {
			sessionFactory.getCurrentSession().delete(blog);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}

	}

	@Override
	@Transactional
	public List<Blog> getAllPendingBlogs() {
		String hql = "FROM BLOGS WHERE STATUS = 'PENDING'";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public List<Blog> getCreatedBlogs(int userID) {
		String hql = "FROM BLOGS WHERE USER_ID = :userID ORDER BY POST_DATE DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("userID", userID);
		System.out.println(userID);
		return query.list();
	}

	@Override
	@Transactional
	public List<Blog> getLatestBlogs() {
		String hql = "FROM BLOGS WHERE STATUS = 'APPROVED' ORDER BY POST_DATE DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setMaxResults(5);
		return query.list();
	}

}
