package com.studenthub.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.studenthub.dao.ForumMemberDAO;
import com.studenthub.entity.ForumMember;

@Repository("forumMemberDAO")
public class ForumMemberDAOImpl implements ForumMemberDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public ForumMember getForumMember(int id) {
		return (ForumMember) sessionFactory.getCurrentSession().get(ForumMember.class, id);
	}

	@Override
	@Transactional
	public List<ForumMember> list(int id) {
		String hql = "FROM FORUM_MEMBERS WHERE FORUM_ID = :id ORDER BY MEMBER_ID";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		return query.list();
	}

	@Override
	@Transactional
	public boolean addForumMember(ForumMember forumMember) {
		try {
			sessionFactory.getCurrentSession().save(forumMember);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteForumMember(ForumMember forumMember) {
		try {
			sessionFactory.getCurrentSession().delete(forumMember);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public List<ForumMember> pendingList(int id) {
		String hql = "FROM FORUM_MEMBERS WHERE STATUS = 'PENDING' AND FORUM_ID = :id ORDER BY MEMBER_ID";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		return query.list();
	}

	@Override
	@Transactional
	public boolean updateForumMember(ForumMember forumMember) {
		try {
			sessionFactory.getCurrentSession().update(forumMember);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public List<ForumMember> get12Members(int id) {
		String hql = "FROM FORUM_MEMBERS WHERE STATUS = 'APPROVED' AND (FORUM_ID = :id AND ROLE = 'USER') ORDER BY MEMBER_ID";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		query.setMaxResults(12);
		return query.list();
	}

	@Override
	@Transactional
	public List<ForumMember> get12Admin(int id) {
		String hql = "FROM FORUM_MEMBERS WHERE STATUS = 'APPROVED' AND (FORUM_ID = :id AND ROLE = 'ADMIN' OR ROLE = 'COADMIN') ORDER BY MEMBER_ID";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		query.setMaxResults(12);
		return query.list();
	}

	@Override
	@Transactional
	public List<ForumMember> membersList(int id) {
		String hql = "FROM FORUM_MEMBERS WHERE STATUS = 'APPROVED' AND FORUM_ID = :id ORDER BY MEMBER_ID";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		return query.list();
	}

}
