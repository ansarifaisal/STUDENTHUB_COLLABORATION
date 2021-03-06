package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.TopicDAO;
import com.studenthub.entity.Topic;

@Repository("topicDAO")
public class TopicDAOImpl implements TopicDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public Topic getTopic(int id) {
		return (Topic) sessionFactory.getCurrentSession().get(Topic.class, id);
	}

	@Override
	@Transactional
	public List<Topic> list() {
		String hql = "FROM TOPICS ORDER BY TOPIC_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addTopic(Topic topic) {
		try {
			sessionFactory.getCurrentSession().save(topic);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateTopic(Topic topic) {
		try {
			sessionFactory.getCurrentSession().update(topic);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteTopic(Topic topic) {
		try {
			sessionFactory.getCurrentSession().delete(topic);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public List<Topic> getAllPendingTopics() {
		String hql = "FROM TOPICS WHERE STATUS = 'PENDING'";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public List<Topic> getCreatedTopics(int userID) {
		String hql = "FROM TOPICS WHERE USER_ID = :userID AND STATUS = 'OPEN' ORDER BY CREATED_DATE DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("userID", userID);
		return query.list();
	}

	@Override
	@Transactional
	public List<Topic> getLatestTopics() {
		String hql = "FROM TOPICS WHERE STATUS = 'OPEN' ORDER BY CREATED_DATE DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setMaxResults(5);
		return query.list();
	}

	@Override
	@Transactional
	public List<Topic> listByForum(int id) {
		String hql = "FROM TOPICS WHERE FORUM_ID = :id ORDER BY TOPIC_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		return query.list();
	}

}
