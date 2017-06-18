package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Event;

public interface EventDAO {

	Event getEvent(int id);

	List<Event> list();

	List<Event> listAllPendingEvents();

	List<Event> getCreatedEvents(int userID);

	List<Event> getLatestEvents();

	boolean addEvent(Event event);

	boolean updateEvent(Event event);

	boolean deleteEvent(Event event);

}
