/**
 * 
 */
package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.UserDAO;
import com.studenthub.entity.User;

/**
 * @author DrEaMeR
 *
 */
@Repository("userDAO")
public class UserDAOImpl implements UserDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public User get(int id) {
		return (User) sessionFactory.getCurrentSession().get(User.class, id);
	}

	@Override
	@Transactional
	public User getByUserName(String userName) {
		String hql = "FROM USERS WHERE USERNAME = :userName";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("userName", userName);
		return (User) query.getSingleResult();
	}

	@Override
	@Transactional
	public List<User> list() {
		String hql = "FROM USERS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}

	@Override
	@Transactional
	public boolean add(User user) {
		try {
			sessionFactory.getCurrentSession().save(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean update(User user) {
		try {
			sessionFactory.getCurrentSession().update(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean delete(User user) {
		try {
			sessionFactory.getCurrentSession().delete(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public User isValidate(User user) {
		String userName = user.getUserName();
		String password = user.getPassword();
		
		String hql = "FROM USERS WHERE USERNAME = :userName AND PASSWORD = :password";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("userName", userName);
		query.setParameter("password", password);
		
		return (User) query.getSingleResult();
	}

	@Override
	@Transactional
	public List<User> getAllPendingUsers() {
		String hql = "FROM USERS WHERE STATUS = 'PENDING'";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		return query.list();
	}
	
}
