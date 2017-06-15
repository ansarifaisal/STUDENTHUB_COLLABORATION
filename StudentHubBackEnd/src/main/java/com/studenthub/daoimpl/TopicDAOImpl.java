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
		String hql = "FROM TOPICS";
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
}
