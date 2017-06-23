package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.ForumMember;

public interface ForumMemberDAO {

	ForumMember getForumMember(int id);

	List<ForumMember> pendingList();

	List<ForumMember> list();

	boolean addForumMember(ForumMember forumMember);

	boolean deleteForumMember(ForumMember forumMember);
	
	boolean updateForumMember(ForumMember forumMember);

}
