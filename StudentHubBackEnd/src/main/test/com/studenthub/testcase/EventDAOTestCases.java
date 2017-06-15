package com.studenthub.testcase;

import java.time.LocalDateTime;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.EventDAO;
import com.studenthub.entity.Event;

import junit.framework.Assert;

public class EventDAOTestCases {

	@Autowired
	Event event;

	@Autowired
	EventDAO eventDAO;
	
	@Autowired
	AnnotationConfigApplicationContext context;
	
	public EventDAOTestCases(){
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		event = (Event) context.getBean("event");
		eventDAO = (EventDAO) context.getBean("eventDAO");
	}
	
	@Test
	public void addEventTestCase(){
		
		event.setUserId(1);
		event.setUserName("ansarifaisal");
		event.setEventTitle("This is a test");
		event.setImageURL("noPic.jpg");
		event.setVenue("Hall");
		event.setDescription("This is a test, this is a test");
		event.setStartDate("26-01-1995");
		event.setEndDate("26-01-1995");
		event.setPostDate("26-01-1995");
		event.setNoOfApplied(0);
		event.setReported("NO");
		event.setEventStatus("Coming Soon");
		event.setStatus("PENDING");
		Assert.assertEquals(true, eventDAO.addEvent(event));
		
	}
	
	/*@Test
	public void updateEventTestCase(){
		event = eventDAO.getEvent(1);
		event.setEndDate(LocalDateTime.parse("2017-02-26T05:00:00"));
		eventDAO.updateEvent(event);
	}*/
	
	/*@Test
	public void ListEventTestCase(){
		List<Event> events = eventDAO.list();
		Assert.assertEquals(2, eventDAO.list().size());
	}*/
	
	/*@Test
	public void deleteEventTestCase(){
		event = eventDAO.getEvent(3);
		Assert.assertEquals(true, eventDAO.deleteEvent(event));
	}*/
}
