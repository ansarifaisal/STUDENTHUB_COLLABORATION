package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Blog;

public interface BlogDAO {

	Blog getBlog(int id);
	
	List<Blog> list();
	
	List<Blog> getAllPendingBlogs();
	
	List<Blog> getCreatedBlogs(int userID);
	
	List<Blog> getLatestBlogs();
	
	boolean addBlog(Blog blog);
	
	boolean updateBlog(Blog blog);
	
	boolean deleteBlog(Blog blog);
	
	
		
}
