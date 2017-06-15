package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.FriendDAO;
import com.studenthub.entity.Friend;

@Repository("friendDAO")
public class FriendDAOImpl implements FriendDAO{

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public List<Friend> list() {
		String hql = "FROM FRIENDS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addFriend(Friend friend) {
		try {
			sessionFactory.getCurrentSession().save(friend);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteFriend(Friend friend) {
		try {
			sessionFactory.getCurrentSession().delete(friend);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public Friend getFriend(int id) {
		return (Friend) sessionFactory.getCurrentSession().get(Friend.class, id);
	}
	
}
