package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.BlogLikes;

public interface BlogLikesDAO {

	BlogLikes getBlogLikes(int id);

	List<BlogLikes> list(int id);

	boolean addBlogLikes(BlogLikes blogLikes);
	
	boolean existingLikes(int id, int userId);
	
	boolean deleteLike(BlogLikes blogLikes);

}
