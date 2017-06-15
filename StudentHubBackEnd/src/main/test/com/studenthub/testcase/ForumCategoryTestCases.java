package com.studenthub.testcase;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.ForumCategoryDAO;
import com.studenthub.entity.ForumCategory;

import junit.framework.Assert;

public class ForumCategoryTestCases {

	@Autowired
	ForumCategory forumCategory;
	
	@Autowired
	ForumCategoryDAO forumCategoryDAO;
	
	@Autowired
	AnnotationConfigApplicationContext context;
	
	public ForumCategoryTestCases(){
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		forumCategory = (ForumCategory) context.getBean("forumCategory");
		forumCategoryDAO = (ForumCategoryDAO) context.getBean("forumCategoryDAO");
	}
	
//	@Test
//	public void addForumCategoryTestCase(){
//		forumCategory.setName("Science");
//		forumCategory.setDescription("This category Contain the test");
//		forumCategory.setStatus("PENDING");
//		Assert.assertEquals(true, forumCategoryDAO.addForumCategory(forumCategory));
//	}
	
	/*@Test
	public void updateForumCategoryTestCase(){
		forumCategory = forumCategoryDAO.getForumCategory(1);
		forumCategory.setName("IT");
		Assert.assertEquals(true, forumCategoryDAO.updateForumCategory(forumCategory));
	}*/
	
/*	@Test
	public void deleteForumCategoryTestCase(){
		forumCategory = forumCategoryDAO.getForumCategory(2);
		forumCategoryDAO.deleteForumCategory(forumCategory);
		Assert.assertEquals(true, forumCategoryDAO.deleteForumCategory(forumCategory));
	}*/
	
	@Test
	public void findByNameCategoryTestCase(){
		Assert.assertEquals(true, forumCategoryDAO.findByName("IT"));
	}
}
