package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.EventDAO;
import com.studenthub.entity.Event;

@Repository("eventDAO")
public class EventDAOImpl implements EventDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public Event getEvent(int id) {
		return (Event) sessionFactory.getCurrentSession().get(Event.class, id);
	}

	@Override
	@Transactional
	public List<Event> list() {
		String hql = "FROM EVENTS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addEvent(Event event) {
		try {
			sessionFactory.getCurrentSession().save(event);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean updateEvent(Event event) {
		try {
			sessionFactory.getCurrentSession().update(event);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteEvent(Event event) {
		try {
			sessionFactory.getCurrentSession().delete(event);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public List<Event> listAllPendingEvents() {
		String hql = "FROM EVENTS WHERE STATUS = 'PENDING' ORDER BY EVENT_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public List<Event> getCreatedEvents(int userID) {
		String hql = "FROM EVENTS WHERE USER_ID = :userID AND STATUS = 'APPROVED' ORDER BY EVENT_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("userID", userID);
		return query.list();
	}

	@Override
	@Transactional
	public List<Event> getLatestEvents() {
		String hql = "FROM EVENTS WHERE STATUS = 'APPROVED' ORDER BY EVENT_ID DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setMaxResults(5);
		return query.list();
	}

}
