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

import com.studenthub.dao.BlogCommentDAO;
import com.studenthub.dao.BlogDAO;
import com.studenthub.dao.EventDAO;
import com.studenthub.dao.ForumDAO;
import com.studenthub.dao.HandledDAO;
import com.studenthub.dao.JobDAO;
import com.studenthub.dao.ReportDAO;
import com.studenthub.entity.Blog;
import com.studenthub.entity.BlogComment;
import com.studenthub.entity.Event;
import com.studenthub.entity.Forum;
import com.studenthub.entity.Handled;
import com.studenthub.entity.Job;
import com.studenthub.entity.Report;

@RestController
public class ReportController {

	@Autowired
	Report report;

	@Autowired
	ReportDAO reportDAO;

	@Autowired
	Handled handled;

	@Autowired
	HandledDAO handledDAO;

	@Autowired
	Blog blog;

	@Autowired
	BlogDAO blogDAO;

	@Autowired
	BlogComment blogComment;

	@Autowired
	BlogCommentDAO blogCommentDAO;

	@Autowired
	Job job;

	@Autowired
	JobDAO jobDAO;

	@Autowired
	Event event;

	@Autowired
	EventDAO eventDAO;

	@Autowired
	Forum forum;

	@Autowired
	ForumDAO forumDAO;

	// <!-------------------Get Report By Category----------------!>

	@RequestMapping(value = "/admin/report/category/{category}", method = RequestMethod.GET)
	public ResponseEntity<List<Report>> getByCategory(@PathVariable("category") String category) {
		List<Report> reports = reportDAO.getByCategory(category);
		if (reports.isEmpty()) {
			return new ResponseEntity<List<Report>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Report>>(reports, HttpStatus.OK);
		}
	}

	// <!-----------------Get Report By ID-------------------!>

	@RequestMapping(value = "/admin/report/id/{id}", method = RequestMethod.GET)
	public ResponseEntity<Report> getReport(@PathVariable("id") int id) {
		report = reportDAO.getReport(id);
		if (report != null) {
			return new ResponseEntity<Report>(report, HttpStatus.OK);
		} else {
			return new ResponseEntity<Report>(HttpStatus.NOT_FOUND);
		}
	}

	// <!---------------Get Unread Reports By Category----------------!>

	@RequestMapping(value = "/admin/report/unread/{category}", method = RequestMethod.GET)
	public ResponseEntity<List<Report>> getUnreadReports(@PathVariable("category") String category) {
		List<Report> unreadReport = reportDAO.getUnreadReportsByCat(category);
		if (unreadReport.isEmpty()) {
			return new ResponseEntity<List<Report>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Report>>(unreadReport, HttpStatus.OK);
		}
	}

	// <!---------------Mark As Read---------------------------!>

	@RequestMapping(value = "/admin/report/read/{category}", method = RequestMethod.GET)
	public ResponseEntity<Report> markUnread(@PathVariable("category") String category) {
		List<Report> unreadReports = reportDAO.getUnreadReportsByCat(category);
		if (unreadReports.isEmpty()) {
			for (Report report : unreadReports) {
				report.setStatus("READ");
				reportDAO.updateReport(report);
			}
			return new ResponseEntity<Report>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-------------------Handle Report-------------------!>

	@RequestMapping(value = "/admin/report/handle", method = RequestMethod.POST)
	public ResponseEntity<Handled> handleReport(@RequestBody Handled handled) {
		boolean flag = handledDAO.addHandle(handled);
		if (flag != false) {
			switch (handled.getTypeOfReport()) {
			case "BLOG":
				blog = blogDAO.getBlog(handled.getReportId());
				blog.setReport("NO");
				blogDAO.updateBlog(blog);
				break;
			case "BLOG COMMENT":
				blogComment = blogCommentDAO.getBlogComment(handled.getCommentId());
				blogComment.setReport("NO");
				blogCommentDAO.updateBlogComment(blogComment);
				break;
			case "JOB":
				job = jobDAO.getJob(handled.getReportId());
				job.setReport("NO");
				jobDAO.updateJob(job);
				break;
			case "EVENT":
				event = eventDAO.getEvent(handled.getReportId());
				event.setReported("NO");
				eventDAO.updateEvent(event);
				break;
			case "FORUM":
				forum = forumDAO.getForum(handled.getReportId());
				forum.setReport("NO");
				forumDAO.updateForum(forum);
				break;
			}
			return new ResponseEntity<Handled>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Handled>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-----------------Delete Request---------------------!>

	@RequestMapping(value = "/admin/report/delete/{id}", method = RequestMethod.GET)
	public ResponseEntity<Report> deleteReport(@PathVariable("id") int id) {
		report = reportDAO.getReport(id);
		if (report != null) {
			reportDAO.deleteReport(report);
			return new ResponseEntity<Report>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Report>(HttpStatus.NOT_FOUND);
		}
	}

	// <!------------------Count Unread Report------------------!>

	public int countReport() {
		int unreadUserReport = reportDAO.getUnreadReportsByCat("USER").size();
		int unreadBlogReport = reportDAO.getUnreadReportsByCat("BLOG").size();
		int unreadBlogCommentsReport = reportDAO.getUnreadReportsByCat("BLOG COMMENT").size();
		int unreadTopicReport = reportDAO.getUnreadReportsByCat("TOPIC").size();
		int unreadTopicCommentReport = reportDAO.getUnreadReportsByCat("TOPIC COMMENT").size();
		int unreadJobReport = reportDAO.getUnreadReportsByCat("JOB").size();
		int unreadEventReport = reportDAO.getUnreadReportsByCat("EVENT").size();
		int grandTotal = unreadUserReport + unreadBlogReport + unreadBlogCommentsReport + unreadTopicReport
				+ unreadTopicCommentReport + unreadJobReport + unreadEventReport;
		return grandTotal;
	}
}
