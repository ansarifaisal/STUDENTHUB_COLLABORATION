package com.studenthub.testcase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.EventDAO;
import com.studenthub.dao.EventJoinedDAO;
import com.studenthub.entity.Event;
import com.studenthub.entity.EventJoined;

public class EventJoinedDAOTestCase {

	@Autowired
	Event event;

	@Autowired
	EventDAO eventDAO;
	
	@Autowired
	EventJoined eventJoined;

	@Autowired
	EventJoinedDAO eventJoinedDAO;
	
	@Autowired
	AnnotationConfigApplicationContext context;
	
	public EventJoinedDAOTestCase(){
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		event = (Event) context.getBean("event");
		eventDAO = (EventDAO) context.getBean("eventDAO");
		eventJoined = (EventJoined) context.getBean("eventJoined");
		eventJoinedDAO = (EventJoinedDAO) context.getBean("eventJoinedDAO");
	}
	
	/*@Test
	public void addJoinedEventTestCase(){
		event = eventDAO.getEvent(3);
		eventJoined.setEvent(event);
		eventJoined.setUserId(1);
		eventJoined.setUserName("ansarifaisal");
		eventJoined.setStatus("PENDING");
		eventJoinedDAO.addEventJoined(eventJoined);
	}*/
	
	/*@Test
	public void deleteJoinedEventTestCase(){
		eventJoined = eventJoinedDAO.getEventJoined(2);
		eventJoinedDAO.deleteEventJoined(eventJoined);
	}*/
	
}
