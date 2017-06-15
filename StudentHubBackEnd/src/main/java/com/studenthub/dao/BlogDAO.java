package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Blog;

public interface BlogDAO {

	Blog getBlog(int id);
	
	List<Blog> list();
	
	boolean addBlog(Blog blog);
	
	boolean updateBlog(Blog blog);
	
	boolean deleteBlog(Blog blog);
	
	List<Blog> getAllPendingBlogs();
		
}
