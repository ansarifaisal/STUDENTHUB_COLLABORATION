package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.EventJoined;

public interface EventJoinedDAO {

	EventJoined getEventJoined(int id);
	
	List<EventJoined> list();
	
	List<EventJoined> joinEventList(int eventID);
	
	List<EventJoined> joinedEventList(int userID);
	
	boolean addEventJoined(EventJoined eventJoined);
	
	boolean deleteEventJoined(EventJoined eventJoined);
	
}
