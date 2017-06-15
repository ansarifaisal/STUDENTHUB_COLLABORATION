package com.studenthub.testcase;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.ForumCategoryDAO;
import com.studenthub.dao.ForumDAO;
import com.studenthub.entity.Forum;
import com.studenthub.entity.ForumCategory;

public class ForumTestCases {
	
	@Autowired
	ForumCategory forumCategory;
	
	@Autowired
	ForumCategoryDAO forumCategoryDAO;
	
	@Autowired
	Forum forum;
	
	@Autowired
	ForumDAO forumDAO;
	
	@Autowired
	AnnotationConfigApplicationContext context;
	
	public ForumTestCases(){
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		forumCategory = (ForumCategory) context.getBean("forumCategory");
		forumCategoryDAO = (ForumCategoryDAO) context.getBean("forumCategoryDAO");
		forum = (Forum) context.getBean("forum");
		forumDAO = (ForumDAO) context.getBean("forumDAO");
	}
	
	@Test
	public void addForumTestCase(){
		forum.setCreatedDate("26-01-1995");
		forum.setUserId(2);
		forum.setUserName("ansarifaisal");
		forum.setForumName("Testing");
		forum.setForumDescription("This is a test");
		forum.setStatus("PENDING");
		forum.setImageURL("noPic.jpg");
		forum.setNoOfMembers(0);
		forum.setNoOfRequest(0);
		forum.setNoOfTopics(0);
		forum.setReport("NO");
		forumDAO.addForum(forum);
	}
	
	/*@Test
	public void updateForumTestCase(){
		forum = forumDAO.getForum(2);
		forum.setCreatedDate(LocalDateTime.now());
		forumDAO.updateForum(forum);
	}*/
	
	/*@Test
	public void deleForumTestCase(){
		forum = forumDAO.getForum(5);
		forumDAO.deleteForum(forum);
	}*/
	
}
