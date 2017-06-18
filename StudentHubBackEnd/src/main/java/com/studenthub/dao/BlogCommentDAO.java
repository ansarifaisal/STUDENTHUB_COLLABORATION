package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.BlogComment;

public interface BlogCommentDAO {
	BlogComment getBlogComment(int id);
	
	List<BlogComment> list(int id);
	
	boolean addBlogComment(BlogComment blogComment);
	
	boolean updateBlogComment(BlogComment blogComment);
	
	boolean deleteBlogComment(BlogComment blogComment);
}
