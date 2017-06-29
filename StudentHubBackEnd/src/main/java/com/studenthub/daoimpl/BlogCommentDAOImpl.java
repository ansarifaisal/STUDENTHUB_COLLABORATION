package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.BlogCommentDAO;
import com.studenthub.entity.BlogComment;

@Repository("blogCommentDAO")
public class BlogCommentDAOImpl implements BlogCommentDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public BlogComment getBlogComment(int id) {
		return (BlogComment) sessionFactory.getCurrentSession().get(BlogComment.class, id);
	}

	@Override
	@Transactional
	public List<BlogComment> list(int id) {
		String hql = "FROM BLOG_COMMENTS WHERE BLOG_ID = :blogID ORDER BY BLOG_COMMENT_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("blogID", id);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addBlogComment(BlogComment blogComment) {
		try {
			sessionFactory.getCurrentSession().save(blogComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@Override
	@Transactional
	public boolean updateBlogComment(BlogComment blogComment) {
		try {
			sessionFactory.getCurrentSession().update(blogComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@Override
	@Transactional
	public boolean deleteBlogComment(BlogComment blogComment) {
		try {
			sessionFactory.getCurrentSession().delete(blogComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
