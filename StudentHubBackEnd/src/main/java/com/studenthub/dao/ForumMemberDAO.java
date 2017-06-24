package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.ForumMember;

public interface ForumMemberDAO {

	ForumMember getForumMember(int id);

	List<ForumMember> pendingList(int id);

	List<ForumMember> membersList(int id);
	
	List<ForumMember> list(int id);

	List<ForumMember> get12Members(int id);
	
	List<ForumMember> get12Admin(int id);

	boolean addForumMember(ForumMember forumMember);

	boolean deleteForumMember(ForumMember forumMember);

	boolean updateForumMember(ForumMember forumMember);

}
