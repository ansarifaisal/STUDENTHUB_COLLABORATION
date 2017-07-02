package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.EventJoinedDAO;
import com.studenthub.entity.EventJoined;

@Repository("eventJoinedDAO")
public class EventJoinedDAOImpl implements EventJoinedDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public EventJoined getEventJoined(int id) {
		return (EventJoined) sessionFactory.getCurrentSession().get(EventJoined.class, id);
	}

	@Override
	@Transactional
	public List<EventJoined> list() {
		String hql = "FROM EVENT_JOINED";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addEventJoined(EventJoined eventJoined) {
		try {
			sessionFactory.getCurrentSession().save(eventJoined);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteEventJoined(EventJoined eventJoined) {
		try {
			sessionFactory.getCurrentSession().delete(eventJoined);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public List<EventJoined> joinEventList(int eventID) {
		String hql = "FROM EVENT_JOINED WHERE EVENT_ID = :eventID";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("eventID", eventID);
		return query.list();
	}

	@Override
	@Transactional
	public List<EventJoined> joinedEventList(int userID) {
		String hql = "FROM EVENT_JOINED WHERE USER_ID = :userID ORDER BY JOINED_ID";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("userID", userID);
		return query.list();
	}

}
