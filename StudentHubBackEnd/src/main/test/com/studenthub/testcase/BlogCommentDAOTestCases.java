package com.studenthub.testcase;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.BlogCommentDAO;
import com.studenthub.dao.BlogDAO;
import com.studenthub.entity.Blog;
import com.studenthub.entity.BlogComment;

import junit.framework.Assert;

public class BlogCommentDAOTestCases {

	@Autowired
	Blog blog;

	@Autowired
	BlogDAO blogDAO;
	
	@Autowired
	BlogComment blogComment;

	@Autowired
	BlogCommentDAO blogCommentDAO;
	
	@Autowired
	AnnotationConfigApplicationContext context;
	
	public BlogCommentDAOTestCases(){
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		blog = (Blog) context.getBean("blog");
		blogDAO = (BlogDAO) context.getBean("blogDAO");
		blogComment = (BlogComment) context.getBean("blogComment");
		blogCommentDAO = (BlogCommentDAO) context.getBean("blogCommentDAO");
	}
	
	@Test
	public void addBlogCommentTestCase(){
		
		blogComment.setBlog(1);
		blogComment.setUserId(2);
		blogComment.setUserName("ansarifaisal");
		blogComment.setBlogComment("This is a test, this is a test");
		blogComment.setCommentDate("26-01-1995");
		blogComment.setNoOfLikes(3);
		Assert.assertEquals(true, blogCommentDAO.addBlogComment(blogComment));
	}
	
	/*@Test
	public void getBlogCommentTestCase(){
		blogComment = blogCommentDAO.getBlogComment(14);
		Assert.assertEquals(14, blogComment.getId());
	}*/
	
	/*@Test
	public void updateBlogCommentTestCase(){
		blogComment = blogCommentDAO.getBlogComment(14);
		blogComment.setBlogComment("thullu");
		Assert.assertEquals(true, blogCommentDAO.updateBlogComment(blogComment));
		
	}*/
	
//	@Test
//	public void deleteBlogCommentTestCase(){
//		blogComment = blogCommentDAO.getBlogComment(17);
//		Assert.assertEquals(true, blogCommentDAO.deleteBlogComment(blogComment));
//	}
}
