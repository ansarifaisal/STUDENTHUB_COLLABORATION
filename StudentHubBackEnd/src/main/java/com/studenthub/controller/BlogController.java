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
import com.studenthub.entity.Blog;
import com.studenthub.entity.BlogComment;
import com.studenthub.entity.User;

@RestController
public class BlogController {

	@Autowired
	BlogDAO blogDAO;

	@Autowired
	Blog blog;

	@Autowired
	BlogComment blogComment;

	@Autowired
	BlogCommentDAO blogCommentDAO;

	// <-----------------Fetch All Blogs--------------------------->
	@RequestMapping(value = "/blogs", method = RequestMethod.GET)
	public ResponseEntity<List<Blog>> getAllBlogs() {

		List<Blog> blogs = blogDAO.list();
		if (blogs.isEmpty()) {
			blog.setCode(404);
			blog.setMessage("No Blogs Found!");
			return new ResponseEntity<List<Blog>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Blog>>(blogs, HttpStatus.OK);
		}
	}

	// <-----------------Fetch All My Blogs--------------------------->

	@RequestMapping(value = "/blog/myblog/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Blog>> getCreatedBlogs(@PathVariable("id") int userID) {
		List<Blog> myBlogs = blogDAO.getCreatedBlogs(userID);
		if (myBlogs.isEmpty()) {
			blog.setCode(404);
			blog.setMessage("No Blogs Found!");
			return new ResponseEntity<List<Blog>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Blog>>(myBlogs, HttpStatus.OK);
		}
	}

	// <-----------------------Get Single Blog------------------------------>
	@RequestMapping(value = "/blog/{id}", method = RequestMethod.GET)
	public ResponseEntity<Blog> getBlog(@PathVariable("id") int id) {

		blog = blogDAO.getBlog(id);
		if (blog != null) {
			return new ResponseEntity<Blog>(blog, HttpStatus.OK);
		} else {
			blog.setCode(404);
			blog.setMessage("Blog Not Found!");
			return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
		}
	}

	// <---------------------Create Edit Blog--------------------------->
	@RequestMapping(value = "/blog/createEditBlog", method = RequestMethod.POST)
	public ResponseEntity<Void> createEditBlog(@RequestBody Blog blog) {
		System.out.println(blog);
		if (blog.getBlogId() == 0) {
			blog.setStatus("PENDING");
			blog.setNoOfComments(0);
			blog.setNoOfLikes(0);
			blog.setReport("NO");
			blogDAO.addBlog(blog);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			blogDAO.updateBlog(blog);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
	}

	// <------------------------Report Blog----------------------------->
	// @RequestMapping(value = "/blog/report/{id}")
	// public ResponseEntity<Blog> reportBlog(@PathVariable("id") int id) {
	//
	// }

	// <------------------Perform Action------------------------------->
	@RequestMapping(value = "/admin/blog/{action}/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> validateUser(@PathVariable("action") String action, @PathVariable("id") int id) {
		blog = blogDAO.getBlog(id);
		if (blog != null) {
			switch (action) {
			case "Approved":
				blog.setStatus("APPROVED");
				break;
			case "Disabled":
				blog.setStatus("DISABLED");
				break;
			case "Rejected":
				blog.setStatus("REJECTED");
				break;
			}
			boolean flag = blogDAO.updateBlog(blog);
			if (flag != false) {
				return new ResponseEntity<User>(HttpStatus.OK);
			} else {
				return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}

	// <----------------------Approve All Blogs--------------------->
	@RequestMapping(value = "/admin/validateallblogs")
	public ResponseEntity<Blog> validateAllUser() {
		List<Blog> pendingBlogs = blogDAO.getAllPendingBlogs();
		for (Blog pendingBlog : pendingBlogs) {
			pendingBlog.setStatus("APPROVED");
			blogDAO.updateBlog(pendingBlog);
		}
		return new ResponseEntity<Blog>(HttpStatus.OK);
	}

	// <=======================Comment Section Starts================>

	@RequestMapping(value = "/blog/{id}/comments", method = RequestMethod.GET)
	public ResponseEntity<List<BlogComment>> getAllComments(@PathVariable("id") int id) {
		List<BlogComment> comments = blogCommentDAO.list(id);
		if (comments.isEmpty()) {
			return new ResponseEntity<List<BlogComment>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<BlogComment>>(comments, HttpStatus.OK);
		}
	}

}
