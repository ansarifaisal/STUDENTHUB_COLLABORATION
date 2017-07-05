package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.FriendDAO;
import com.studenthub.entity.Friend;
import com.studenthub.entity.User;

@Repository("friendDAO")
public class FriendDAOImpl implements FriendDAO {

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
	public List<Friend> listSentRequest(int id) {
		String hql = "FROM FRIENDS WHERE INITIATER_ID = :id AND STATUS = 'PENDING'";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		return query.list();
	}

	@Override
	@Transactional
	public List<Friend> listReceivedRequest(int id) {
		String hql = "FROM FRIENDS WHERE FRIEND_ID = :id AND STATUS = 'PENDING'";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
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
	public boolean updateFriend(Friend friend) {
		try {
			sessionFactory.getCurrentSession().update(friend);
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

	@Override
	@Transactional
	public List<User> noFriends(int id) {
		String selectQuery = "SELECT * FROM USERS WHERE USER_ID NOT IN (SELECT INITIATER_ID FROM FRIENDS WHERE FRIEND_ID = :id OR INITIATER_ID = :id UNION SELECT FRIEND_ID FROM FRIENDS WHERE FRIEND_ID = :id OR INITIATER_ID = :id) AND STATUS = 'APPROVED'";
		return sessionFactory.getCurrentSession().createNativeQuery(selectQuery, User.class).setParameter("id", id)
				.getResultList();
	}

	@Override
	@Transactional
	public List<User> myFriends(int id) {
		String selectQuery = "SELECT * FROM USERS WHERE USER_ID IN (SELECT INITIATER_ID FROM FRIENDS WHERE (FRIEND_ID = :id OR INITIATER_ID = :id) AND STATUS = 'APPROVED' UNION SELECT FRIEND_ID FROM FRIENDS WHERE (FRIEND_ID = :id OR INITIATER_ID = :id) AND STATUS = 'APPROVED')";
		return sessionFactory.getCurrentSession().createNativeQuery(selectQuery, User.class).setParameter("id", id)
				.getResultList();
	}

}
