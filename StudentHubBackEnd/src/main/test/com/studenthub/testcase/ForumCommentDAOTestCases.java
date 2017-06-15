package com.studenthub.testcase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.ForumCommentDAO;
import com.studenthub.dao.ForumDAO;
import com.studenthub.entity.Forum;
import com.studenthub.entity.ForumComment;

public class ForumCommentDAOTestCases {

	@Autowired
	Forum forum;

	@Autowired
	ForumDAO forumDAO;

	@Autowired
	ForumComment forumComment;

	@Autowired
	ForumCommentDAO forumCommentDAO;

	@Autowired
	AnnotationConfigApplicationContext context;

	public ForumCommentDAOTestCases() {
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		forum = (Forum) context.getBean("forum");
		forumDAO = (ForumDAO) context.getBean("forumDAO");
		forumComment = (ForumComment) context.getBean("forumComment");
		forumCommentDAO = (ForumCommentDAO) context.getBean("forumCommentDAO");
	}

	/*
	 * @Test public void addForumCommentDAO(){ forum = forumDAO.getForum(4);
	 * forumComment.setForum(forum);
	 * forumComment.setCommentDate(LocalDateTime.now());
	 * forumComment.setUserId(1); forumComment.setUserName("ansarifaisal");
	 * forumComment.setComment("This is a test"); Assert.assertEquals(true,
	 * forumCommentDAO.addForumComment(forumComment)); }
	 */

	/*
	 * @Test public void updateForumCommentDAO() { forumComment =
	 * forumCommentDAO.getForumComment(2); forumComment.setComment("testtest");
	 * Assert.assertEquals(true,
	 * forumCommentDAO.updateForumComment(forumComment)); }
	 */

	/*
	 * @Test public void deleteForumCommentDAO() { forumComment =
	 * forumCommentDAO.getForumComment(2); Assert.assertEquals(true,
	 * forumCommentDAO.deleteForumComment(forumComment)); }
	 */
}