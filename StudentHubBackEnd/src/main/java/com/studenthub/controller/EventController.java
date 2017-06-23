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
import com.studenthub.dao.EventJoinedDAO;
import com.studenthub.dao.ReportDAO;
import com.studenthub.entity.Event;
import com.studenthub.entity.EventJoined;
import com.studenthub.entity.Job;
import com.studenthub.entity.Report;

@RestController
public class EventController {

	@Autowired
	Event event;

	@Autowired
	EventDAO eventDAO;

	@Autowired
	EventJoined eventJoined;

	@Autowired
	EventJoinedDAO eventJoinedDAO;

	@Autowired
	Report report;

	@Autowired
	ReportDAO reportDAO;

	// <!----------------Fetch All Events---------------------->
	@RequestMapping(value = "/events", method = RequestMethod.GET)
	public ResponseEntity<List<Event>> fetchAllEvents() {
		List<Event> events = eventDAO.list();
		if (events.isEmpty()) {
			return new ResponseEntity<List<Event>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Event>>(events, HttpStatus.OK);
		}
	}

	// <!----------------Fetch Single Event---------------------->
	@RequestMapping(value = "/event/{id}", method = RequestMethod.GET)
	public ResponseEntity<Event> getEvent(@PathVariable("id") int id) {
		event = eventDAO.getEvent(id);
		if (event != null) {
			return new ResponseEntity<Event>(event, HttpStatus.OK);
		} else {
			return new ResponseEntity<Event>(HttpStatus.NOT_FOUND);
		}
	}

	// <!----------------Perform action on Event---------------------->
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

	// <!----------------Validate all Events---------------------->
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

	// <!----------------Create Or Edit Event---------------------->
	@RequestMapping(value = "/event/createEditEvent", method = RequestMethod.POST)
	public ResponseEntity<Event> createEditJob(@RequestBody Event event) {
		System.out.println(event);
		if (event.getId() == 0) {
			eventDAO.addEvent(event);
			return new ResponseEntity<Event>(HttpStatus.OK);
		} else {
			eventDAO.updateEvent(event);
			return new ResponseEntity<Event>(HttpStatus.OK);
		}
	}

	// <!----------------Join Event----------------------!>
	
	@RequestMapping(value = "/event/join", method = RequestMethod.POST)
	public ResponseEntity<EventJoined> eventJoined(@RequestBody EventJoined eventJoined) {
		boolean flag = eventJoinedDAO.checkExisiting(eventJoined.getEvent().getId(), eventJoined.getUserId());
		if (flag != false) {
			boolean added = eventJoinedDAO.addEventJoined(eventJoined);
			if (added != false) {
				event = eventDAO.getEvent(eventJoined.getEvent().getId());
				List<EventJoined> list = eventJoinedDAO.joinEventList(eventJoined.getEvent().getId());
				event.setNoOfApplied(list.size());
				eventDAO.updateEvent(event);
				return new ResponseEntity<EventJoined>(HttpStatus.OK);
			} else {
				return new ResponseEntity<EventJoined>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<EventJoined>(HttpStatus.FOUND);
		}

	}

	// <!-----------------Leave Event--------------------------!>

	@RequestMapping(value = "/event/leave/{userId}/{id}", method = RequestMethod.GET)
	public ResponseEntity<EventJoined> leaveEvent(@PathVariable("id") int eventID, @PathVariable("userId") int userID) {
		eventJoined = eventJoinedDAO.getByUserID(userID, eventID);
		if (eventJoined.getId() != 0) {
			boolean flag = eventJoinedDAO.deleteEventJoined(eventJoined);
			if (flag != false) {
				event = eventDAO.getEvent(eventID);
				List<EventJoined> list = eventJoinedDAO.joinEventList(eventID);
				event.setNoOfApplied(list.size());
				eventDAO.updateEvent(event);
				return new ResponseEntity<EventJoined>(HttpStatus.OK);
			} else {
				return new ResponseEntity<EventJoined>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<EventJoined>(HttpStatus.NOT_FOUND);
		}
	}

	// <!---------------------Report Event----------------------!>
	@RequestMapping(value = "/event/report", method = RequestMethod.POST)
	public ResponseEntity<Report> reportEvent(@RequestBody Report report) {
		event = eventDAO.getEvent(report.getReportId());
		if (event != null) {
			report.setStatus("UNREAD");
			boolean flag = reportDAO.addReport(report);
			if (flag != false) {
				event.setReported("YES");
				eventDAO.updateEvent(event);
				return new ResponseEntity<Report>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <!----------------Fetch All Joined Events---------------------->
	@RequestMapping(value = "/{id}/events", method = RequestMethod.GET)
	public ResponseEntity<List<EventJoined>> fetchAllJoinedEvents(@PathVariable("id") int id) {
		List<EventJoined> events = eventJoinedDAO.joinedEventList(id);
		if (events.isEmpty()) {
			return new ResponseEntity<List<EventJoined>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<EventJoined>>(events, HttpStatus.OK);
		}
	}

	// <!----------------Fetch All Created Events----------------------!>

	@RequestMapping(value = "/event/created/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Event>> fetchAllCreatedEvents(@PathVariable("id") int id) {

		List<Event> events = eventDAO.getCreatedEvents(id);
		if (events.isEmpty()) {
			return new ResponseEntity<List<Event>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Event>>(events, HttpStatus.OK);
		}
	}

}
