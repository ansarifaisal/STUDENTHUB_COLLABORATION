package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.EventJoined;

public interface EventJoinedDAO {

	EventJoined getEventJoined(int id);
	
	List<EventJoined> list();
	
	boolean addEventJoined(EventJoined eventJoined);
	
	boolean deleteEventJoined(EventJoined eventJoined);
	
}
