package com.studenthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studenthub.dao.EventDAO;
import com.studenthub.entity.Event;
import com.studenthub.entity.Job;

@RestController
public class EventController {

	@Autowired
	Event event;

	@Autowired
	EventDAO eventDAO;

	@RequestMapping(value = "/events", method = RequestMethod.GET)
	public ResponseEntity<List<Event>> fetchAllEvents() {
		List<Event> events = eventDAO.list();
		if (events.isEmpty()) {
			return new ResponseEntity<List<Event>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Event>>(events, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/event/{id}", method = RequestMethod.GET)
	public ResponseEntity<Event> getEvent(@PathVariable("id") int id) {
		event = eventDAO.getEvent(id);
		if (event != null) {
			return new ResponseEntity<Event>(event, HttpStatus.OK);
		} else {
			return new ResponseEntity<Event>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/admin/event/{action}/{id}", method = RequestMethod.GET)
	public ResponseEntity<Job> validateEvent(@PathVariable("action") String action, @PathVariable("id") int id) {
		event = eventDAO.getEvent(id);
		if (event != null) {
			switch (action) {
			case "Approved":
				event.setStatus("APPROVED");
				break;
			case "Rejected":
				event.setStatus("REJECTED");
				break;
			case "Disabled":
				event.setStatus("DISABLED");
				break;
			}
			boolean flag = eventDAO.updateEvent(event);
			if (flag != false) {
				return new ResponseEntity<Job>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Job>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Job>(HttpStatus.NO_CONTENT);
		}
	}

	@RequestMapping(value = "/admin/validateallevents", method = RequestMethod.GET)
	public ResponseEntity<List<Event>> validateAllEvent() {
		List<Event> pendingEvents = eventDAO.listAllPendingEvents();
		if (pendingEvents.isEmpty()) {
			return new ResponseEntity<List<Event>>(HttpStatus.NO_CONTENT);
		} else {
			for (Event pendingEvent : pendingEvents) {
				pendingEvent.setStatus("APPROVED");
				eventDAO.updateEvent(pendingEvent);
			}
			return new ResponseEntity<List<Event>>(HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/event/createEditEvent", method = RequestMethod.POST)
	public ResponseEntity<Event> createEditJob(@RequestBody Event event) {
		if (event.getId()== 0) {
			event.setEventStatus("Coming Soon");
			event.setStatus("PENDING");
			event.setReported("NO");
			eventDAO.addEvent(event);
			return new ResponseEntity<Event>(HttpStatus.OK);
		} else {
			eventDAO.updateEvent(event);
			return new ResponseEntity<Event>(HttpStatus.OK);
		}
	}

}
