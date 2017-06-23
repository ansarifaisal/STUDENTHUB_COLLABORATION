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
import com.studenthub.dao.ForumMemberDAO;
import com.studenthub.dao.ReportDAO;
import com.studenthub.entity.Forum;
import com.studenthub.entity.ForumMember;
import com.studenthub.entity.Report;

@RestController
public class ForumController {

	@Autowired
	Forum forum;

	@Autowired
	ForumDAO forumDAO;

	@Autowired
	ForumMember forumMember;

	@Autowired
	ForumMemberDAO forumMemberDAO;

	@Autowired
	Report report;

	@Autowired
	ReportDAO reportDAO;

	// <!------------------------Get all the forums----------------------!>
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

	// <!---------------------get single forum----------------------!>
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

	// <!-------------------Perform action on forum-----------------------!>
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

	// <!---------------------------Create OR Edit Forum------------------!>
	@RequestMapping(value = "/createEditForum", method = RequestMethod.POST)
	public ResponseEntity<Forum> createEditForum(@RequestBody Forum forum) {

		if (forum.getId() == 0) {

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

	// <!-------------------Approve all the forum-----------------!>
	@RequestMapping(value = "/admin/validateallforums")
	public ResponseEntity<Forum> validateAllForums() {
		List<Forum> pendingForums = forumDAO.getAllPendingForums();
		for (Forum pendingForum : pendingForums) {
			pendingForum.setStatus("APPROVED");
			forumDAO.updateForum(pendingForum);
		}
		return new ResponseEntity<Forum>(HttpStatus.OK);
	}

	// <!--------------------Report forum------------------------!>
	@RequestMapping(value = "forum/report", method = RequestMethod.POST)
	public ResponseEntity<Report> reportForum(@RequestBody Report report) {
		forum = forumDAO.getForum(report.getReportId());
		if (forum != null) {
			report.setStatus("UNREAD");
			boolean flag = reportDAO.addReport(report);
			if (flag != false) {
				forum.setReport("YES");
				forumDAO.updateForum(forum);
				return new ResponseEntity<Report>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Join Forum-------------------------!>

	@RequestMapping(value = "/forum/join", method = RequestMethod.POST)
	public ResponseEntity<ForumMember> joinForum(@RequestBody ForumMember forumMember) {
		boolean addForum = forumMemberDAO.addForumMember(forumMember);
		if (addForum != false) {
			int noOfRequest = forumMemberDAO.pendingList().size();
			forumMember.getForum().setNoOfRequest(noOfRequest);
			boolean flag = forumDAO.updateForum(forumMember.getForum());
			if (flag != false) {
				return new ResponseEntity<ForumMember>(HttpStatus.OK);
			} else {
				return new ResponseEntity<ForumMember>(HttpStatus.NOT_IMPLEMENTED);
			}

		} else {
			return new ResponseEntity<ForumMember>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Perform Action On Report-------------------!>

	@RequestMapping(value = "/forum/request/{action}/{id}", method = RequestMethod.GET)
	public ResponseEntity<ForumMember> performAction(@PathVariable("action") String action,
			@PathVariable("id") int id) {
		forumMember = forumMemberDAO.getForumMember(id);
		boolean flag = false;
		if (forumMember != null) {
			switch (action) {
			case "Reject":
				flag = forumMemberDAO.deleteForumMember(forumMember);
				break;
			case "Accept":
				forumMember.setStatus("ACCEPT");
				forumMemberDAO.updateForumMember(forumMember);
				break;
			case "Cancel":
				flag = forumMemberDAO.deleteForumMember(forumMember);
				break;
			}
			if (flag != false) {
				int noOfRequest = forumMemberDAO.pendingList().size();
				forumMember.getForum().setNoOfRequest(noOfRequest);
				forumDAO.updateForum(forumMember.getForum());
				return new ResponseEntity<ForumMember>(HttpStatus.OK);
			} else {
				return new ResponseEntity<ForumMember>(HttpStatus.NO_CONTENT);
			}

		} else {
			return new ResponseEntity<ForumMember>(HttpStatus.NO_CONTENT);
		}
	}
}
