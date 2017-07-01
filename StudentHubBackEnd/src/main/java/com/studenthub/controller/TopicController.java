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
import com.studenthub.dao.ReportDAO;
import com.studenthub.dao.TopicCommentDAO;
import com.studenthub.dao.TopicDAO;
import com.studenthub.dao.TopicLikesDAO;
import com.studenthub.entity.Forum;
import com.studenthub.entity.Report;
import com.studenthub.entity.Topic;
import com.studenthub.entity.TopicComment;
import com.studenthub.entity.TopicLikes;

@RestController
public class TopicController {

	@Autowired
	Topic topic;

	@Autowired
	TopicDAO topicDAO;

	@Autowired
	Forum forum;

	@Autowired
	ForumDAO forumDAO;

	@Autowired
	TopicLikes topicLikes;

	@Autowired
	TopicLikesDAO topicLikesDAO;

	@Autowired
	TopicComment topicComment;

	@Autowired
	TopicCommentDAO topicCommentDAO;

	@Autowired
	Report report;

	@Autowired
	ReportDAO reportDAO;

	// <!--------------------List all the topic----------------------->
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

	// <!--------------------get topic----------------------->
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

	// <!--------------------Perform action on topic----------------------->
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

	// <!--------------------Validate all topic----------------------->
	@RequestMapping(value = "/admin/validatealltopics")
	public ResponseEntity<Topic> validateAllTopics() {
		List<Topic> pendingTopics = topicDAO.getAllPendingTopics();
		for (Topic pendingTopic : pendingTopics) {
			pendingTopic.setStatus("OPEN");
			topicDAO.updateTopic(pendingTopic);
		}
		return new ResponseEntity<Topic>(HttpStatus.OK);
	}

	// <!--------------------Create topic----------------------->
	@RequestMapping(value = "forum/topic/createEditTopic", method = RequestMethod.POST)
	public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
		if (topic != null) {
			if (topic.getId() == 0) {
				boolean flag = topicDAO.addTopic(topic);
				if (flag != false) {
					forum = topic.getForum();
					int noOfTopics = topicDAO.listByForum(topic.getForum().getId()).size();
					forum.setNoOfTopics(noOfTopics);
					forumDAO.updateForum(forum);
					return new ResponseEntity<Topic>(HttpStatus.OK);
				} else {
					return new ResponseEntity<Topic>(HttpStatus.NO_CONTENT);
				}
			} else {
				boolean flag = topicDAO.updateTopic(topic);

				if (flag != false) {
					return new ResponseEntity<Topic>(HttpStatus.OK);
				} else {
					return new ResponseEntity<Topic>(HttpStatus.NOT_FOUND);
				}
			}
		} else {
			return new ResponseEntity<Topic>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-----------------------Get All Forum Topics--------------------------!>
	@RequestMapping(value = "/forum/{id}/topics", method = RequestMethod.GET)
	public ResponseEntity<List<Topic>> getTopics(@PathVariable("id") int id) {
		List<Topic> topics = topicDAO.listByForum(id);
		if (topics != null) {
			return new ResponseEntity<List<Topic>>(topics, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<Topic>>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-----------------------Report Forum----------------------------!>
	@RequestMapping(value = "/forum/topic/report", method = RequestMethod.POST)
	public ResponseEntity<Report> reportTopic(@RequestBody Report report) {
		topic = topicDAO.getTopic(report.getReportId());
		if (topic != null) {
			report.setStatus("UNREAD");
			boolean flag = reportDAO.addReport(report);
			if (flag != false) {
				topic.setReport("YES");
				topicDAO.updateTopic(topic);
				return new ResponseEntity<Report>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <!--------------------Topic Like-----------------------------!>

	@RequestMapping(value = "/forum/topic/like", method = RequestMethod.POST)
	public ResponseEntity<TopicLikes> topicLike(@RequestBody TopicLikes topicLike) {
		if (topicLike != null) {
			boolean flag = topicLikesDAO.addTopicLikes(topicLike);

			if (flag != false) {
				int noOfLikes = topicLikesDAO.list(topicLike.getTopic().getId()).size();
				topic = topicLike.getTopic();
				topic.setNoOfLikes(noOfLikes);
				topicDAO.updateTopic(topic);
				return new ResponseEntity<TopicLikes>(HttpStatus.OK);
			} else {
				return new ResponseEntity<TopicLikes>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<TopicLikes>(HttpStatus.NO_CONTENT);
		}

	}

	// <!---------------------Dislike Topic---------------------------------!>
	@RequestMapping(value = "/forum/topic/dislike/{id}", method = RequestMethod.GET)
	public ResponseEntity<TopicLikes> dislikeTopic(@PathVariable("id") int id) {
		topicLikes = topicLikesDAO.getTopicLike(id);
		topic = topicLikes.getTopic();
		if (topicLikes != null) {
			boolean flag = topicLikesDAO.deleteLike(topicLikes);
			if (flag != false) {
				int noOfLikes = topicLikesDAO.list(topic.getId()).size();
				topic.setNoOfLikes(noOfLikes);
				topicDAO.updateTopic(topic);
				return new ResponseEntity<TopicLikes>(HttpStatus.OK);
			} else {
				return new ResponseEntity<TopicLikes>(HttpStatus.NOT_FOUND);
			}

		} else {
			return new ResponseEntity<TopicLikes>(HttpStatus.NOT_FOUND);
		}
	}

	// <!---------------------------Create Edit Comment-----------------------!>

	@RequestMapping(value = "/forum/topic/comment/createEditComment", method = RequestMethod.POST)
	public ResponseEntity<TopicComment> createEditComment(@RequestBody TopicComment topicComment) {
		if (topicComment != null) {
			if (topicComment.getId() == 0) {
				boolean flag = topicCommentDAO.addTopicComment(topicComment);
				topic = topicComment.getTopic();
				if (flag != false) {
					int noOfComments = topicCommentDAO.topicComments(topic.getId()).size();
					topic.setNoOfComments(noOfComments);
					topicDAO.updateTopic(topic);
					return new ResponseEntity<TopicComment>(HttpStatus.OK);
				} else {
					return new ResponseEntity<TopicComment>(HttpStatus.NO_CONTENT);
				}

			} else {
				topicCommentDAO.updateTopicComment(topicComment);
				return new ResponseEntity<TopicComment>(HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<TopicComment>(HttpStatus.NO_CONTENT);
		}
	}

	// <!--------------------------Get Topic Comments ------------------------!>

	@RequestMapping(value = "/forum/topic/comments/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<TopicComment>> getTopicComments(@PathVariable("id") int id) {
		List<TopicComment> topicComments = topicCommentDAO.topicComments(id);
		if (topicComment != null) {
			return new ResponseEntity<List<TopicComment>>(topicComments, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<TopicComment>>(HttpStatus.NO_CONTENT);
		}
	}

	// <!--------------------Get Topic Comment-------------------------------!>
	@RequestMapping(value = "/forum/topic/comment/{id}", method = RequestMethod.GET)
	public ResponseEntity<TopicComment> getTopicComment(@PathVariable("id") int id) {
		topicComment = topicCommentDAO.getTopicComment(id);
		if (topicComment != null) {
			return new ResponseEntity<TopicComment>(topicComment, HttpStatus.OK);
		} else {
			return new ResponseEntity<TopicComment>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-------------------------Report Topic Comment------------------------!>
	@RequestMapping(value = "/forum/topic/comment/report", method = RequestMethod.POST)
	public ResponseEntity<Report> reportTopicComment(@RequestBody Report report) {
		topicComment = topicCommentDAO.getTopicComment(report.getCommentId());

		if (topicComment != null) {
			boolean flag = reportDAO.addReport(report);
			if (flag != false) {
				topicComment.setReport("YES");
				topicCommentDAO.updateTopicComment(topicComment);
				return new ResponseEntity<Report>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-----------------------Delete Topic Comment-----------------------!>
	@RequestMapping(value = "/forum/topic/comment/delete/{id}", method = RequestMethod.GET)
	public ResponseEntity<TopicComment> deleteTopicComment(@PathVariable("id") int id) {
		topicComment = topicCommentDAO.getTopicComment(id);
		topic = topicComment.getTopic();
		if (topicComment != null) {
			boolean flag = topicCommentDAO.deleteTopicComment(topicComment);
			if (flag != false) {
				int noOfComments = topicCommentDAO.topicComments(topic.getId()).size();
				topic.setNoOfComments(noOfComments);
				topicDAO.updateTopic(topic);
				return new ResponseEntity<TopicComment>(HttpStatus.OK);
			} else {
				return new ResponseEntity<TopicComment>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<TopicComment>(HttpStatus.NO_CONTENT);
		}
	}
}
