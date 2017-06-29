package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.TopicCommentDAO;
import com.studenthub.entity.TopicComment;

@Repository("topicCommentDAO")
public class TopicCommentDAOImpl implements TopicCommentDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public TopicComment getTopicComment(int id) {
		return (TopicComment) sessionFactory.getCurrentSession().get(TopicComment.class, id);
	}

	@Override
	@Transactional
	public List<TopicComment> list() {
		String hql = "FROM TOPIC_COMMENTS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public List<TopicComment> topicComments(int id) {
		String hql = "FROM TOPIC_COMMENTS WHERE TOPIC_ID = :id ORDER BY TOPIC_COMMENT_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addTopicComment(TopicComment topicComment) {
		try {
			sessionFactory.getCurrentSession().save(topicComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateTopicComment(TopicComment topicComment) {
		try {
			sessionFactory.getCurrentSession().update(topicComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteTopicComment(TopicComment topicComment) {
		try {
			sessionFactory.getCurrentSession().delete(topicComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
