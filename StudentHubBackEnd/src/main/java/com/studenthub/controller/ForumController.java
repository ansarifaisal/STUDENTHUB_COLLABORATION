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

import com.studenthub.dao.ForumCommentDAO;
import com.studenthub.dao.ForumDAO;
import com.studenthub.dao.ForumMemberDAO;
import com.studenthub.dao.ReportDAO;
import com.studenthub.dao.TopicDAO;
import com.studenthub.entity.Forum;
import com.studenthub.entity.ForumComment;
import com.studenthub.entity.ForumMember;
import com.studenthub.entity.ForumMemberModel;
import com.studenthub.entity.Report;
import com.studenthub.entity.Topic;

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
	ForumComment forumComment;

	@Autowired
	ForumCommentDAO forumCommentDAO;

	@Autowired
	Topic topic;

	@Autowired
	TopicDAO topicDAO;

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
			return new ResponseEntity<Forum>(forum, HttpStatus.OK);

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
			int noOfRequest = forumMemberDAO.pendingList(forumMember.getForumId()).size();
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
		int forumId = forumMember.getForum().getId();
		boolean flag = false;
		if (forumMember != null) {
			switch (action) {
			case "Reject":
				flag = forumMemberDAO.deleteForumMember(forumMember);
				break;
			case "Approved":
				forumMember.setStatus("APPROVED");
				flag = forumMemberDAO.updateForumMember(forumMember);
				break;
			case "Cancel":
				flag = forumMemberDAO.deleteForumMember(forumMember);
				break;
			}
			if (flag != false) {
				if (action.equals("Approved")) {
					int noOfMembers = forumMemberDAO.membersList(forumId).size();
					int noOfRequest = forumMemberDAO.pendingList(forumId).size();
					forum = forumDAO.getForum(forumId);
					forum.setNoOfMembers(noOfMembers);
					forum.setNoOfRequest(noOfRequest);
					forumDAO.updateForum(forum);
				} else {
					int noOfMembers = forumMemberDAO.membersList(forumId).size();
					int noOfRequest = forumMemberDAO.pendingList(forumId).size();
					forum = forumDAO.getForum(forumId);
					forum.setNoOfRequest(noOfRequest);
					forum.setNoOfMembers(noOfMembers);
					forumDAO.updateForum(forum);
				}
				return new ResponseEntity<ForumMember>(HttpStatus.OK);
			} else {
				return new ResponseEntity<ForumMember>(HttpStatus.NO_CONTENT);
			}

		} else {
			return new ResponseEntity<ForumMember>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Get 12 Members----------------------------->

	@RequestMapping(value = "/forum/twelveMembers/{id}", method = RequestMethod.GET)
	public ResponseEntity<ForumMemberModel> get12Members(@PathVariable("id") int id) {

		ForumMemberModel forumMemberModel = new ForumMemberModel();

		List<ForumMember> forumMembers = forumMemberDAO.get12Members(id);
		forumMemberModel.setMembers(forumMembers);

		// System.out.println(forumMembers);

		List<ForumMember> forumAdmins = forumMemberDAO.get12Admin(id);
		forumMemberModel.setAdmins(forumAdmins);

		return new ResponseEntity<ForumMemberModel>(forumMemberModel, HttpStatus.OK);
	}

	// <!------------------------Accept All Request--------------------!>

	@RequestMapping(value = "/forum/approveAll/{id}", method = RequestMethod.GET)
	public ResponseEntity<ForumMember> approveAll(@PathVariable("id") int id) {
		List<ForumMember> pendingMembers = forumMemberDAO.pendingList(id);

		for (ForumMember forumMember : pendingMembers) {
			forumMember.setStatus("APPROVED");
			forumMemberDAO.updateForumMember(forumMember);
		}

		int noOfMembers = forumMemberDAO.membersList(id).size();
		int noOfRequest = forumMemberDAO.pendingList(id).size();

		forum = forumDAO.getForum(id);
		forum.setNoOfRequest(noOfRequest);
		forum.setNoOfMembers(noOfMembers);
		forumDAO.updateForum(forum);

		return new ResponseEntity<ForumMember>(HttpStatus.OK);
	}

	// <!------------------------Create Forum Comment-------------------!>

	@RequestMapping(value = "/forum/comment/createEditForumComment", method = RequestMethod.POST)
	public ResponseEntity<ForumComment> createEditForumComment(@RequestBody ForumComment forumComment) {
		if (forumComment != null) {
			if (forumComment.getId() == 0) {
				forumCommentDAO.addForumComment(forumComment);
				return new ResponseEntity<ForumComment>(HttpStatus.OK);
			} else {
				ForumComment tempForumComment = forumCommentDAO.getForumComment(forumComment.getId());
				forum = tempForumComment.getForum();
				forumComment.setForum(forum);
				forumCommentDAO.updateForumComment(forumComment);
				return new ResponseEntity<ForumComment>(forumComment, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<ForumComment>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-------------------------get Forum Comment-----------------------!>

	@RequestMapping(value = "/forum/comment/{id}", method = RequestMethod.GET)
	public ResponseEntity<ForumComment> getForumComment(@PathVariable("id") int id) {
		forumComment = forumCommentDAO.getForumComment(id);
		if (forumComment != null) {
			return new ResponseEntity<ForumComment>(forumComment, HttpStatus.OK);
		} else {
			return new ResponseEntity<ForumComment>(HttpStatus.NO_CONTENT);
		}
	}

	// <!----------------------get Forum Comments---------------------------!>

	@RequestMapping(value = "/forum/comments/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<ForumComment>> getForumComments(@PathVariable("id") int id) {
		List<ForumComment> forumComments = forumCommentDAO.forumComments(id);
		if (forumComment != null) {
			return new ResponseEntity<List<ForumComment>>(forumComments, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<ForumComment>>(HttpStatus.NO_CONTENT);
		}
	}

	// <!------------------------Report Forum Comment------------------------!>
	@RequestMapping(value = "/forum/comment/report", method = RequestMethod.POST)
	public ResponseEntity<Report> reportForumComment(@RequestBody Report report) {
		forumComment = forumCommentDAO.getForumComment(report.getReportId());
		if (forumComment != null) {
			report.setCommentId(forumComment.getId());
			report.setReportId(forumComment.getForum().getId());
			report.setStatus("UNREAD");
			boolean flag = reportDAO.addReport(report);
			if (flag != false) {
				forumComment.setReport("YES");
				forumCommentDAO.updateForumComment(forumComment);
				return new ResponseEntity<Report>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Delete Forum Comment---------------------!>
	@RequestMapping(value = "/forum/comment/delete/{id}", method = RequestMethod.GET)
	public ResponseEntity<ForumComment> deleteForumComment(@PathVariable("id") int id) {
		forumComment = forumCommentDAO.getForumComment(id);
		if (forumComment != null) {
			boolean flag = forumCommentDAO.deleteForumComment(forumComment);
			if (flag != false) {
				return new ResponseEntity<ForumComment>(HttpStatus.OK);
			} else {
				return new ResponseEntity<ForumComment>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<ForumComment>(HttpStatus.NO_CONTENT);
		}

	}

	// <!--------------------Create topic----------------------->
	@RequestMapping(value = "forum/topic/createEditTopic", method = RequestMethod.POST)
	public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
		if (topic != null) {
			if (topic.getId() == 0) {
				// List<Topic> topics = new ArrayList<Topic>();
				// topics.add(topic);
				boolean flag = topicDAO.addTopic(topic);
				if (flag != false) {
					return new ResponseEntity<Topic>(HttpStatus.OK);
				} else {
					return new ResponseEntity<Topic>(HttpStatus.NO_CONTENT);
				}
			} else {
				return new ResponseEntity<Topic>(HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<Topic>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-----------------------Get Topics--------------------------!>
	@RequestMapping(value = "/forum/{id}/topics", method = RequestMethod.GET)
	public ResponseEntity<List<Topic>> getTopics(@PathVariable("id") int id) {
		List<Topic> topics = topicDAO.list(id);
		if (topics != null) {
			return new ResponseEntity<List<Topic>>(topics, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<Topic>>(HttpStatus.NO_CONTENT);
		}
	}
}
