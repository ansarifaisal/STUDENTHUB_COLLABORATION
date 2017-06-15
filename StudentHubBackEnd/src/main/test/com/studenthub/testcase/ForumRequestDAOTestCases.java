package com.studenthub.testcase;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.ForumDAO;
import com.studenthub.dao.ForumRequestDAO;
import com.studenthub.entity.Forum;
import com.studenthub.entity.ForumRequest;

import junit.framework.Assert;

public class ForumRequestDAOTestCases {

	@Autowired
	Forum forum;

	@Autowired
	ForumDAO forumDAO;

	@Autowired
	ForumRequest forumRequest;

	@Autowired
	ForumRequestDAO forumRequestDAO;

	@Autowired
	AnnotationConfigApplicationContext context;

	public ForumRequestDAOTestCases() {
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		forum = (Forum) context.getBean("forum");
		forumDAO = (ForumDAO) context.getBean("forumDAO");
		forumRequest = (ForumRequest) context.getBean("forumRequest");
		forumRequestDAO = (ForumRequestDAO) context.getBean("forumRequestDAO");
	}

	/*
	 * @Test public void addForumRequestTestCase(){ forum =
	 * forumDAO.getForum(5); forumRequest.setForum(forum);
	 * forumRequest.setRequestDate(LocalDateTime.now());
	 * forumRequest.setUserId(1); forumRequest.setUserName("ansarifaisal");
	 * forumRequest.setStatus("PENDING"); Assert.assertEquals(true,
	 * forumRequestDAO.addForumRequest(forumRequest)); }
	 */

	@Test
	public void deleteForumRequestTestCase() {
		forumRequest = forumRequestDAO.getForumRequest(3);
		Assert.assertEquals(true, forumRequestDAO.deleteForumRequest(forumRequest));
	}
}
