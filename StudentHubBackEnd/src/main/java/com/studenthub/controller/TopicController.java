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

import com.studenthub.dao.TopicDAO;
import com.studenthub.entity.Topic;

@RestController
public class TopicController {

	@Autowired
	Topic topic;

	@Autowired
	TopicDAO topicDAO;

	@RequestMapping(value = "/topics", method = RequestMethod.GET)
	public ResponseEntity<List<Topic>> getAllTopic() {
		List<Topic> topics = topicDAO.list();
		if (topics.isEmpty()) {
			topic.setCode(404);
			topic.setMessage("Error Fetching The Topics");
			return new ResponseEntity<List<Topic>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Topic>>(topics, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/topic/{id}", method = RequestMethod.GET)
	public ResponseEntity<Topic> getTopic(@PathVariable("id") int id) {
		topic = topicDAO.getTopic(id);
		if (topic != null) {
			topic.setCode(200);
			topic.setMessage("Topic Fetched!");
			return new ResponseEntity<Topic>(topic, HttpStatus.OK);
		} else {
			topic.setCode(404);
			topic.setMessage("Topic Not Found!");
			return new ResponseEntity<Topic>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/admin/topic/{action}/{id}", method = RequestMethod.GET)
	public ResponseEntity<Topic> validateTopic(@PathVariable("action") String action, @PathVariable("id") int id) {
		topic = topicDAO.getTopic(id);
		if (topic != null) {
			switch (action) {
			case "Open":
				topic.setStatus("OPEN");
				break;
			case "Rejected":
				topic.setStatus("REJECTED");
				break;
			case "Closed":
				topic.setStatus("CLOSED");
				break;
			}
			boolean flag = topicDAO.updateTopic(topic);
			if (flag != false) {
				return new ResponseEntity<Topic>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Topic>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<Topic>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/admin/validatealltopics")
	public ResponseEntity<Topic> validateAllTopics() {
		List<Topic> pendingTopics = topicDAO.getAllPendingTopics();
		for (Topic pendingTopic : pendingTopics) {
			pendingTopic.setStatus("OPEN");
			topicDAO.updateTopic(pendingTopic);
		}
		return new ResponseEntity<Topic>(HttpStatus.OK);
	}

	@RequestMapping(value = "/topic/createEditTopic", method = RequestMethod.POST)
	public ResponseEntity<Topic> createEditTopic(@RequestBody Topic topic) {

		if (topic.getId() == 0) {
			topic.setReport("NO");
			topic.setStatus("PENDING");
			topicDAO.addTopic(topic);
			return new ResponseEntity<Topic>(HttpStatus.OK);

		} else {
			boolean flag = topicDAO.updateTopic(topic);

			if (flag != false) {
				return new ResponseEntity<Topic>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Topic>(HttpStatus.NOT_FOUND);
			}

		}

	}
}
