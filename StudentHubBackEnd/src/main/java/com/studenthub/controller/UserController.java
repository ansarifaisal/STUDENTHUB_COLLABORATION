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

import com.studenthub.dao.BlogDAO;
import com.studenthub.dao.EventDAO;
import com.studenthub.dao.ForumDAO;
import com.studenthub.dao.JobDAO;
import com.studenthub.dao.TopicDAO;
import com.studenthub.dao.UserDAO;
import com.studenthub.entity.Blog;
import com.studenthub.entity.Event;
import com.studenthub.entity.Forum;
import com.studenthub.entity.Job;
import com.studenthub.entity.ProfileModel;
import com.studenthub.entity.Topic;
import com.studenthub.entity.User;
import com.studenthub.entity.UserModel;
import com.studenthub.service.EmailService;

@RestController
public class UserController {

	@Autowired
	UserDAO userDAO;

	@Autowired
	EmailService emailService;

	@Autowired
	User user;
	
	@Autowired
	Forum forum;
	
	@Autowired
	ForumDAO forumDAO;
	
	@Autowired
	Topic topic;
	
	@Autowired
	TopicDAO topicDAO;
	
	@Autowired
	Event event;
	
	@Autowired
	EventDAO eventDAO;
	
	@Autowired
	Job job;
	
	@Autowired
	JobDAO jobDAO;
	
	@Autowired
	Blog blog;
	
	@Autowired
	BlogDAO blogDAO;

	@RequestMapping(value = { "/register" }, method = RequestMethod.POST)
	public ResponseEntity<Void> registerUser(@RequestBody User user) {

		if (user.getId() == 0) {
			user.setProfilePicture("noPic.png");
			user.setRole("USER");
			user.setIsOnline("FALSE");
			user.setStatus("PENDING");
			user.setNoOfComments(0);
			user.setNoOfEvents(0);
			user.setNoOfForums(0);
			user.setNoOfJobs(0);
			user.setNoOfFriends(0);
			user.setCode(200);
			user.setMessage("Registration Successful");
			userDAO.add(user);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			userDAO.update(user);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
	}

	@RequestMapping(value = { "/existingUser" }, method = RequestMethod.POST)
	public ResponseEntity<Void> existingUser(@RequestBody String userName) {
		User existingUser = userDAO.getByUserName(userName);
		if (existingUser == null) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Void>(HttpStatus.FOUND);
		}
	}

	@RequestMapping(value = { "/logout" }, method = RequestMethod.POST)
	public ResponseEntity<Void> logoutUser(@RequestBody User user) {
		user.setIsOnline("false");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = { "/admin/get" }, method = RequestMethod.GET)
	public ResponseEntity<List<User>> getUser() {

		List<User> users = userDAO.list();
		if (users.isEmpty()) {
			User user = new User();
			user.setCode(404);
			user.setMessage("Error!");
		}
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@RequestMapping(value = { "/login" }, method = RequestMethod.POST)
	public ResponseEntity<User> login(@RequestBody User user) {
		if (user.getUserName() != null && user.getPassword() != null) {
			if (userDAO.isValidate(user) == null) {
				user = new User();
				user.setCode(404);
				user.setMessage("Invalid Credentials");
				return new ResponseEntity<User>(user, HttpStatus.NO_CONTENT);
			} else {
				user = userDAO.getByUserName(user.getUserName());
				user.setIsOnline("FALSE");
				user.setProfilePicture("USER_" + user.getId() + ".png");
				user.setCode(200);
				user.setMessage("Login Successful!");
				userDAO.update(user);
				return new ResponseEntity<User>(user, HttpStatus.OK);
			}
		} else {
			user = new User();
			return new ResponseEntity<User>(user, HttpStatus.NO_CONTENT);
		}
	}

	@RequestMapping(value = "/admin/edit/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> edit(@PathVariable("id") int id) {
		user = userDAO.get(id);
		if (user != null) {
			return new ResponseEntity<User>(user, HttpStatus.OK);

		} else {
			user.setCode(404);
			user.setMessage("User Not Found!");
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}

	}

	@RequestMapping(value = "/admin/{action}/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> validateUser(@PathVariable("action") String action, @PathVariable("id") int id) {
		user = userDAO.get(id);
		if (user != null) {
			switch (action) {
			case "Approved":
				user.setStatus("APPROVED");
				emailService.approvedUserMessage(user);
				break;
			case "Disabled":
				user.setStatus("DISABLED");
				break;
			case "Rejected":
				user.setStatus("REJECTED");
				break;
			}
			boolean flag = userDAO.update(user);
			if (flag != false) {
				return new ResponseEntity<User>(HttpStatus.OK);
			} else {
				return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/admin/validateallusers")
	public ResponseEntity<User> validateAllUser() {
		List<User> pendingUsers = userDAO.getAllPendingUsers();
		for (User pendingUser : pendingUsers) {
			pendingUser.setStatus("APPROVED");
			userDAO.update(pendingUser);
		}
		return new ResponseEntity<User>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/content", method = RequestMethod.GET)
	public ResponseEntity<UserModel> fetchContents(){
		
		UserModel userModel = new UserModel();
		
		
		List<Topic> latestTopics = topicDAO.getLatestTopics();
		userModel.setlatestTopics(latestTopics);
		
		List<Blog> latestBlogs = blogDAO.getLatestBlogs();
		userModel.setlatestBlogs(latestBlogs);
		
		List<Job> latestJobs = jobDAO.getLatestJobs();
		userModel.setlatestJobs(latestJobs);
		
		List<Event> latestEvents = eventDAO.getLatestEvents();
		userModel.setlatestEvents(latestEvents);
		
		List<Forum> latestForums = forumDAO.getLatestForums();
		userModel.setlatestForums(latestForums);
		
		return new ResponseEntity<UserModel>(userModel, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/user/profile/{id}", method = RequestMethod.GET)
	public ResponseEntity<ProfileModel> profileContents(@PathVariable("id") int id){
		
		ProfileModel profileModel = new ProfileModel();
		
		user = userDAO.get(id);
		
		List<Forum> createdForums = profileModel.getCreatedForums();
		profileModel.setCreatedForums(createdForums);
		
		List<Event> appliedEvents = profileModel.getCreatedEvents();
		profileModel.setCreatedEvents(appliedEvents);
		
		return new ResponseEntity<ProfileModel>(profileModel, HttpStatus.OK);
		
	}

}
