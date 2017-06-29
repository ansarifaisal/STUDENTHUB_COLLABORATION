package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.TopicComment;

public interface TopicCommentDAO {

	TopicComment getTopicComment(int id);

	List<TopicComment> list();

	List<TopicComment> topicComments(int id);

	boolean addTopicComment(TopicComment topicComment);

	boolean updateTopicComment(TopicComment topicComment);

	boolean deleteTopicComment(TopicComment topicComment);
	
}
