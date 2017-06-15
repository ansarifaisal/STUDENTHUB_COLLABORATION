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

import com.studenthub.dao.ForumDAO;
import com.studenthub.entity.Forum;

@RestController
public class ForumController {

	@Autowired
	Forum forum;

	@Autowired
	ForumDAO forumDAO;

	@RequestMapping(value = "/forums", method = RequestMethod.GET)
	public ResponseEntity<List<Forum>> getAllForum() {
		List<Forum> forums = forumDAO.list();

		if (forums.isEmpty()) {
			forum.setCode(404);
			forum.setMessage("Error Fetching The Forums");
			return new ResponseEntity<List<Forum>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Forum>>(forums, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/forum/{id}", method = RequestMethod.GET)
	public ResponseEntity<Forum> getForum(@PathVariable("id") int id) {
		forum = forumDAO.getForum(id);
		if (forum != null) {
			forum.setCode(200);
			forum.setMessage("Forum Fetched!");
			return new ResponseEntity<Forum>(forum, HttpStatus.OK);
		} else {
			forum.setCode(404);
			forum.setMessage("Forum Not Found!");
			return new ResponseEntity<Forum>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/admin/forum/{action}/{id}", method = RequestMethod.GET)
	public ResponseEntity<Forum> validateForum(@PathVariable("action") String action, @PathVariable("id") int id) {
		forum = forumDAO.getForum(id);
		if (forum != null) {
			switch (action) {
			case "Approved":
				forum.setStatus("APPROVED");
				break;
			case "Closed":
				forum.setStatus("CLOSED");
				break;
			case "Rejected":
				forum.setStatus("REJECTED");
				break;
			}
			boolean flag = forumDAO.updateForum(forum);
			if (flag != false) {
				return new ResponseEntity<Forum>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Forum>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<Forum>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/createEditForum", method = RequestMethod.POST)
	public ResponseEntity<Forum> createEditForum(@RequestBody Forum forum) {

		if (forum.getId() == 0) {
			forum.setNoOfMembers(0);
			forum.setNoOfRequest(0);
			forum.setNoOfTopics(0);
			forum.setReport("NO");
			forum.setStatus("PENDING");
			forumDAO.addForum(forum);
			return new ResponseEntity<Forum>(HttpStatus.OK);

		} else {
			boolean flag = forumDAO.updateForum(forum);

			if (flag != false) {
				return new ResponseEntity<Forum>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Forum>(HttpStatus.NOT_FOUND);
			}

		}

	}

	@RequestMapping(value = "/admin/validateallforums")
	public ResponseEntity<Forum> validateAllForums() {
		List<Forum> pendingForums = forumDAO.getAllPendingForums();
		for (Forum pendingForum : pendingForums) {
			pendingForum.setStatus("APPROVED");
			forumDAO.updateForum(pendingForum);
		}
		return new ResponseEntity<Forum>(HttpStatus.OK);
	}

}
