package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Topic;

public interface TopicDAO {

	Topic getTopic(int id);

	List<Topic> list();

	boolean addTopic(Topic topic);

	boolean updateTopic(Topic topic);

	boolean deleteTopic(Topic topic);
	
}
