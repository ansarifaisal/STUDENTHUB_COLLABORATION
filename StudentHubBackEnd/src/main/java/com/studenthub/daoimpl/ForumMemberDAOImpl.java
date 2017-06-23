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
	public List<ForumMember> list() {
		String hql = "FROM FORUM_MEMBERS";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
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
	public List<ForumMember> pendingList() {
		String hql = "FROM FORUM_MEMBERS WHERE STATUS = 'PENDING' ORDER BY MEMBER_ID";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
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

}
