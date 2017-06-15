package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.ForumRequest;

public interface ForumRequestDAO {

	ForumRequest getForumRequest(int id);

	List<ForumRequest> list();

	boolean addForumRequest(ForumRequest forumRequest);

	boolean deleteForumRequest(ForumRequest forumRequest);
	
}
