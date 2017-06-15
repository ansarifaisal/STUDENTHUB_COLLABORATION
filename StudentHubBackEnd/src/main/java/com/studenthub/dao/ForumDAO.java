package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Forum;

public interface ForumDAO {

	Forum getForum(int id);

	List<Forum> list();
	
	List<Forum> getAllPendingForums();

	boolean addForum(Forum forum);

	boolean updateForum(Forum forum);

	boolean deleteForum(Forum forum);
	
}
