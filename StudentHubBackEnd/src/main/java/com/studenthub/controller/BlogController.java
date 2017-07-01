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
import com.studenthub.dao.BlogLikesDAO;
import com.studenthub.dao.HandledDAO;
import com.studenthub.dao.ReportDAO;
import com.studenthub.entity.Blog;
import com.studenthub.entity.BlogComment;
import com.studenthub.entity.BlogLikes;
import com.studenthub.entity.Handled;
import com.studenthub.entity.Report;

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

	@Autowired
	BlogLikes blogLikes;

	@Autowired
	BlogLikesDAO blogLikesDAO;

	@Autowired
	Report report;

	@Autowired
	ReportDAO reportDAO;

	@Autowired
	Handled handled;

	@Autowired
	HandledDAO handledDAO;

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
		if (blog.getBlogId() == 0) {
			blogDAO.addBlog(blog);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			blogDAO.updateBlog(blog);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
	}

	// <------------------Perform Action------------------------------->
	@RequestMapping(value = "/admin/blog/{action}/{id}", method = RequestMethod.GET)
	public ResponseEntity<Blog> validateUser(@PathVariable("action") String action, @PathVariable("id") int id) {
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
				return new ResponseEntity<Blog>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
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

	// <------------------Like Blog------------------------------->

	@RequestMapping(value = "/blog/like", method = RequestMethod.POST)
	public ResponseEntity<Void> likeBlog(@RequestBody BlogLikes blogLikes) {
		boolean flag = blogLikesDAO.addBlogLikes(blogLikes);
		if (flag != false) {
			int noOfLikes = blogLikesDAO.list(blogLikes.getBlog().getBlogId()).size();
			blog = blogLikes.getBlog();
			blog.setNoOfLikes(noOfLikes);
			blogDAO.updateBlog(blog);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}

	}

	// <---------------------Report Blog------------------------------->

	@RequestMapping(value = "/blog/report", method = RequestMethod.POST)
	public ResponseEntity<Report> reportBlog(@RequestBody Report report) {
		blog = blogDAO.getBlog(report.getReportId());
		if (blog != null) {
			report.setStatus("UNREAD");
			boolean flag = reportDAO.addReport(report);
			if (flag != false) {
				blog.setReport("YES");
				blogDAO.updateBlog(blog);
				return new ResponseEntity<Report>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <----------------------Handle Report-------------------------->

	@RequestMapping(value = "/admin/blog/handle", method = RequestMethod.POST)
	public ResponseEntity<Handled> handleReport(@RequestBody Handled handled) {
		blog = blogDAO.getBlog(handled.getReportId());
		if (blog != null) {
			boolean flag = handledDAO.addHandle(handled);
			if (flag != false) {
				blog.setReport("NO");
				blogDAO.updateBlog(blog);
				report = reportDAO.getReport(handled.getId());
				reportDAO.deleteReport(report);
				return new ResponseEntity<Handled>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Handled>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Handled>(HttpStatus.NO_CONTENT);
		}
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

	// -----------------------createEditComment-----------------------

	@RequestMapping(value = "/blog/createEditComment", method = RequestMethod.POST)
	public ResponseEntity<BlogComment> createEditComment(@RequestBody BlogComment blogComment) {

		if (blogComment.getId() == 0) {
			boolean flag = blogCommentDAO.addBlogComment(blogComment);
			if (flag != false) {
				blog = blogComment.getBlog();
				int updateCount = blog.getNoOfComments() + 1;
				blog.setNoOfComments(updateCount);
				blogDAO.updateBlog(blog);
			}
			return new ResponseEntity<BlogComment>(HttpStatus.OK);
		} else {
			blogCommentDAO.updateBlogComment(blogComment);
			return new ResponseEntity<BlogComment>(HttpStatus.OK);
		}
	}
	// <---------------------GET COMMENT--------------->

	@RequestMapping(value = "/blog/comments/edit/{id}", method = RequestMethod.GET)
	public ResponseEntity<BlogComment> getComment(@PathVariable("id") int id) {
		blogComment = blogCommentDAO.getBlogComment(id);
		if (blogComment != null) {
			return new ResponseEntity<BlogComment>(blogComment, HttpStatus.OK);
		} else {
			return new ResponseEntity<BlogComment>(HttpStatus.NOT_FOUND);
		}
	}

	// <------------------REPORT COMMENT--------------->

	@RequestMapping(value = "/blog/report/comment", method = RequestMethod.POST)
	public ResponseEntity<Report> reportComment(@RequestBody Report report) {
		blogComment = blogCommentDAO.getBlogComment(report.getCommentId());
		if (blogComment != null) {
			boolean flag = reportDAO.addReport(report);
			if (flag != false) {
				blogComment.setReport("YES");
				blogCommentDAO.updateBlogComment(blogComment);
				return new ResponseEntity<Report>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <!----------Delete Blog Comment---------------->
	@RequestMapping(value = "/blog/comment/delete/{id}", method = RequestMethod.GET)
	public ResponseEntity<BlogComment> deleteBlogComment(@PathVariable("id") int id) {
		blogComment = blogCommentDAO.getBlogComment(id);
		if (blogComment != null) {
			boolean flag = blogCommentDAO.deleteBlogComment(blogComment);
			if (flag != false) {
				blog = blogComment.getBlog();
				List<BlogComment> list = blogCommentDAO.list(blogComment.getBlog().getBlogId());
				blog.setNoOfComments(list.size());
				blogDAO.updateBlog(blog);
				return new ResponseEntity<BlogComment>(HttpStatus.OK);
			} else {
				return new ResponseEntity<BlogComment>(HttpStatus.NOT_EXTENDED);
			}
		} else {
			return new ResponseEntity<BlogComment>(HttpStatus.NOT_FOUND);
		}
	}

	// <!------------------------Dislike Blog------------------------!>
	@RequestMapping(value = "/blog/dislike/{id}", method = RequestMethod.GET)
	public ResponseEntity<BlogLikes> disLikeBlog(@PathVariable("id") int id) {
		blogLikes = blogLikesDAO.getBlogLikes(id);
		blog = blogLikes.getBlog();
		if (blogLikes != null) {
			boolean flag = blogLikesDAO.deleteLike(blogLikes);
			if (flag != false) {
				int noOfLikes = blogLikesDAO.list(blog.getBlogId()).size();
				blog.setNoOfLikes(noOfLikes);
				blogDAO.updateBlog(blog);
				return new ResponseEntity<BlogLikes>(HttpStatus.OK);
			} else {
				return new ResponseEntity<BlogLikes>(HttpStatus.NOT_FOUND);
			}

		} else {
			return new ResponseEntity<BlogLikes>(HttpStatus.NOT_FOUND);
		}
	}
}
