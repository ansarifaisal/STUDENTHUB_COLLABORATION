package com.studenthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studenthub.dao.BlogCommentDAO;
import com.studenthub.dao.BlogDAO;
import com.studenthub.dao.HandledDAO;
import com.studenthub.dao.ReportDAO;
import com.studenthub.entity.Blog;
import com.studenthub.entity.BlogComment;
import com.studenthub.entity.Handled;
import com.studenthub.entity.Report;

@RestController
public class HandleController {

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

	// <!-------------------Get Handled By Category----------------!>

	@RequestMapping(value = "/admin/handle/category/{category}", method = RequestMethod.GET)
	public ResponseEntity<List<Handled>> getByCategory(@PathVariable("category") String category) {
		List<Handled> handled = handledDAO.getByCategory(category);
		if (handled.isEmpty()) {
			return new ResponseEntity<List<Handled>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Handled>>(handled, HttpStatus.OK);
		}
	}

	// <!-----------------Get Report By ID-------------------!>

	@RequestMapping(value = "/admin/handle/id/{id}", method = RequestMethod.GET)
	public ResponseEntity<Handled> getReport(@PathVariable("id") int id) {
		handled = handledDAO.getHandle(id);
		if (handled != null) {
			return new ResponseEntity<Handled>(handled, HttpStatus.OK);
		} else {
			return new ResponseEntity<Handled>(HttpStatus.NOT_FOUND);
		}
	}

}
