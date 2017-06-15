package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.ForumCategory;

public interface ForumCategoryDAO {

	ForumCategory getForumCategory(int id);

	List<ForumCategory> list();

	boolean addForumCategory(ForumCategory forumCategory);

	boolean updateForumCategory(ForumCategory forumCategory);

	boolean deleteForumCategory(ForumCategory forumCategory);
	
	boolean findByName(String forumCategoryName);

}
