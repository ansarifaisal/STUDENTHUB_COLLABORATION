package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.TopicLikes;

public interface TopicLikesDAO {

	TopicLikes getTopicLike(int id);

	List<TopicLikes> list(int id);

	boolean addTopicLikes(TopicLikes topicLikes);

	boolean existingLikes(int id, int userId);

	boolean deleteLike(TopicLikes topicLikes);

}
