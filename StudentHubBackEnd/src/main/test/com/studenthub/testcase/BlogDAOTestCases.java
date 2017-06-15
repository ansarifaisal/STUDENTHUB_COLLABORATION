package com.studenthub.testcase;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.BlogCommentDAO;
import com.studenthub.dao.BlogDAO;
import com.studenthub.entity.Blog;
import com.studenthub.entity.BlogComment;

public class BlogDAOTestCases {

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

	public BlogDAOTestCases() {
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		blog = (Blog) context.getBean("blog");
		blogDAO = (BlogDAO) context.getBean("blogDAO");
		blogComment = (BlogComment) context.getBean("blogComment");
		blogCommentDAO = (BlogCommentDAO) context.getBean("blogCommentDAO");
	}

	@Test
	public void addBlogTestCase() {

		blog.setTitle("This Is A Test");
		blog.setUserId(1);
		blog.setUserName("ansarifaisal");
		blog.setDescription("This a test, this is a test");
		blog.setStatus("PENDING");
		blog.setPostDate("26-01-1995");
		blog.setNoOfComments(0);
		blog.setNoOfLikes(0);
		blog.setReport("NO");
		blog.setImageUrl("noPic.jpg");
		
		Assert.assertEquals(true, blogDAO.addBlog(blog));
	}

	/*@Test
	public void getBlogTest() {
		blog = blogDAO.getBlog(8);
		LocalDateTime localDateTime = blog.getPostDate();
		
		System.out.println(localDateTime.getMonth());
		System.out.println(localDateTime.getDayOfMonth());
	}*/
	
	/*@Test
	public void updateBlogTest(){
		blog = blogDAO.getBlog(8);
		blog.setPostDate(LocalDateTime.now());
		
		Assert.assertEquals(true, blogDAO.updateBlog(blog));
	}*/
	
	/*@Test
	public void deleteBlogTest(){
		blog = blogDAO.getBlog(8);
		Assert.assertEquals(true, blogDAO.deleteBlog(blog));
	}*/
}
