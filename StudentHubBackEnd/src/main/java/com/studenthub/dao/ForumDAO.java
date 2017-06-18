package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Forum;

public interface ForumDAO {

	Forum getForum(int id);

	List<Forum> list();
	
	List<Forum> getAllPendingForums();
	
	List<Forum> getCreatedForums(int userID);
	
	List<Forum> getLatestForums();

	boolean addForum(Forum forum);

	boolean updateForum(Forum forum);

	boolean deleteForum(Forum forum);
	
}
