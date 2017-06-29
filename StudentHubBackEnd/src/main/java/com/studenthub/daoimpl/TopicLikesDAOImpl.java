package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.TopicLikesDAO;
import com.studenthub.entity.TopicLikes;

@Repository("topicLikesDAO")
public class TopicLikesDAOImpl implements TopicLikesDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public TopicLikes getTopicLike(int id) {
		return (TopicLikes) sessionFactory.getCurrentSession().get(TopicLikes.class, id);
	}

	@Override
	@Transactional
	public List<TopicLikes> list(int id) {
		String hql = "FROM TOPIC_LIKES WHERE TOPIC_ID = :topicID ORDER BY DATE_TIME DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("topicID", id);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addTopicLikes(TopicLikes topicLikes) {
		try {
			sessionFactory.getCurrentSession().save(topicLikes);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean existingLikes(int id, int userId) {
		String hql = "FROM TOPIC_LIKES WHERE TOPIC_ID = :topicID AND USER_ID = :userId";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("topicID", id);
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
	public boolean deleteLike(TopicLikes topicLikes) {
		try {
			sessionFactory.getCurrentSession().delete(topicLikes);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
