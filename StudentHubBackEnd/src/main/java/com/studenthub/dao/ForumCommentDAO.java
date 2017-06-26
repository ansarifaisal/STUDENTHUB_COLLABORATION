package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.ForumComment;

public interface ForumCommentDAO {

	ForumComment getForumComment(int id);

	List<ForumComment> list();

	List<ForumComment> forumComments(int id);

	boolean addForumComment(ForumComment forumComment);

	boolean updateForumComment(ForumComment forumComment);

	boolean deleteForumComment(ForumComment forumComment);

}
