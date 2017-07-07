package com.studenthub.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.studenthub.dao.BlogDAO;
import com.studenthub.dao.EducationDetailsDAO;
import com.studenthub.dao.EventDAO;
import com.studenthub.dao.ForumDAO;
import com.studenthub.dao.FriendDAO;
import com.studenthub.dao.JobDAO;
import com.studenthub.dao.MoreDetailsDAO;
import com.studenthub.dao.ReportDAO;
import com.studenthub.dao.SocialLinksDAO;
import com.studenthub.dao.TopicDAO;
import com.studenthub.dao.UserDAO;
import com.studenthub.entity.Blog;
import com.studenthub.entity.EducationDetails;
import com.studenthub.entity.Event;
import com.studenthub.entity.Forum;
import com.studenthub.entity.Friend;
import com.studenthub.entity.Job;
import com.studenthub.entity.MoreDetails;
import com.studenthub.entity.NotificationModel;
import com.studenthub.entity.ProfileModel;
import com.studenthub.entity.Report;
import com.studenthub.entity.SocialLinks;
import com.studenthub.entity.Topic;
import com.studenthub.entity.User;
import com.studenthub.entity.UserModel;
import com.studenthub.service.EmailService;

@RestController
@PropertySource("classpath:config.properties")
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

	@Autowired
	MoreDetails moreDetails;

	@Autowired
	MoreDetailsDAO moreDetailsDAO;

	@Autowired
	EducationDetails educationDetails;

	@Autowired
	EducationDetailsDAO educationDetailsDAO;

	@Autowired
	SocialLinks socialLinks;

	@Autowired
	SocialLinksDAO socialLinksDAO;

	@Autowired
	Friend friend;

	@Autowired
	FriendDAO friendDAO;

	@Value("${imageBasePath}")
	private String imageBasePath;

	@Autowired
	Report report;

	@Autowired
	ReportDAO reportDAO;

	// <!---------------------------Register User--------------------------!>
	@RequestMapping(value = { "/register" }, method = RequestMethod.POST)
	public ResponseEntity<Void> registerUser(@RequestBody User user) {

		if (user.getId() == 0) {

			boolean flag = userDAO.add(user);

			if (flag != false) {
				return new ResponseEntity<Void>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}

		} else {
			userDAO.update(user);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
	}

	// <!----------------------Check Existing User---------------------!>
	@RequestMapping(value = { "/existingUser" }, method = RequestMethod.POST)
	public ResponseEntity<Void> existingUser(@RequestBody String userName) {
		User existingUser = userDAO.getByUserName(userName);
		if (existingUser == null) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Void>(HttpStatus.FOUND);
		}
	}

	// <!---------------------------Logout User--------------------------!>
	@RequestMapping(value = { "/logout" }, method = RequestMethod.POST)
	public ResponseEntity<Void> logoutUser(@RequestBody User user) {
		user.setIsOnline("false");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	// <!---------------------------Get User--------------------------!>
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

	// <!---------------------------Login User--------------------------!>
	@RequestMapping(value = { "/login" }, method = RequestMethod.POST)
	public ResponseEntity<User> login(@RequestBody User user) {
		if (user.getUserName() != null && user.getPassword() != null) {
			if (userDAO.isValidate(user) == false) {
				user = new User();
				user.setCode(404);
				user.setMessage("Invalid Credentials");
				return new ResponseEntity<User>(user, HttpStatus.NO_CONTENT);
			} else {
				user = userDAO.getByUserName(user.getUserName());
				user.setIsOnline("TRUE");
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

	// <!---------------------------Edit User--------------------------!>
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

	// <!-----------------------Perform action on User---------------------!>
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
			case "Blocked":
				user.setStatus("BLOCKED");
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

	// <!----------------------Validate All Users----------------------!>
	@RequestMapping(value = "/admin/validateallusers")
	public ResponseEntity<User> validateAllUser() {
		List<User> pendingUsers = userDAO.getAllPendingUsers();
		for (User pendingUser : pendingUsers) {
			pendingUser.setStatus("APPROVED");
			userDAO.update(pendingUser);
		}
		return new ResponseEntity<User>(HttpStatus.OK);
	}

	// <!----------------------Add Contact Information----------------!>

	@RequestMapping(value = "/user/addEditMoreDetails", method = RequestMethod.POST)
	public ResponseEntity<MoreDetails> addEditMoreDetails(@RequestBody MoreDetails moreDetails,
			@RequestParam("id") int id) {
		if (moreDetails != null) {
			if (moreDetails.getId() == 0) {
				moreDetails.setUser(user);
				moreDetailsDAO.add(moreDetails);
			} else {
				moreDetails.setUser(user);
				moreDetailsDAO.update(moreDetails);
			}
			return new ResponseEntity<MoreDetails>(HttpStatus.OK);
		} else {
			return new ResponseEntity<MoreDetails>(HttpStatus.NO_CONTENT);
		}
	}

	// <!-------------------Add Add Or Edit Education Details----------!>

	@RequestMapping(value = "/user/addEditEducationDetails", method = RequestMethod.POST)
	public ResponseEntity<EducationDetails> addEditEducationDetails(@RequestBody EducationDetails educationDetails,
			@RequestParam("id") int id) {
		if (educationDetails != null) {
			if (educationDetails.getId() == 0) {
				educationDetails.setUser(user);
				educationDetailsDAO.add(educationDetails);
			} else {
				educationDetails.setUser(user);
				educationDetailsDAO.update(educationDetails);
			}
			return new ResponseEntity<EducationDetails>(HttpStatus.OK);
		} else {
			return new ResponseEntity<EducationDetails>(HttpStatus.NO_CONTENT);
		}
	}

	// <!----------------------Check Old Password---------------------!>
	@RequestMapping(value = { "/checkOldPassword" }, method = RequestMethod.POST)
	public ResponseEntity<Void> checkOldPassword(@RequestBody String oldPassword, @RequestParam("id") int id) {
		user = userDAO.get(id);
		if (user != null) {
			if (user.getPassword().equals(oldPassword)) {
				return new ResponseEntity<Void>(HttpStatus.FOUND);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Change Password-----------------------------!>
	@RequestMapping(value = "/changePassword", method = RequestMethod.POST)
	public ResponseEntity<Void> changePassword(@RequestBody String password, @RequestParam("id") int id) {
		user = userDAO.get(id);
		if (user != null) {
			user.setPassword(password);
			userDAO.update(user);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Report User----------------------!>
	@RequestMapping(value = "/user/report", method = RequestMethod.POST)
	public ResponseEntity<Report> reportJob(@RequestBody Report report) {
		user = userDAO.get(report.getReportId());
		if (user != null) {
			report.setStatus("UNREAD");
			boolean flag = reportDAO.addReport(report);
			if (flag != false) {
				user.setStatus("REPORTED");
				userDAO.update(user);
				return new ResponseEntity<Report>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Report>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Load User Content--------------------!>
	@RequestMapping(value = "/content", method = RequestMethod.GET)
	public ResponseEntity<UserModel> fetchContents() {

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

	// <!--------------------Loading User Profile--------------------!>
	@RequestMapping(value = "/user/profile/{id}", method = RequestMethod.GET)
	public ResponseEntity<ProfileModel> profileContents(@PathVariable("id") int id) {

		ProfileModel profileModel = new ProfileModel();

		user = userDAO.get(id);
		profileModel.setUser(user);

		List<Forum> createdForums = forumDAO.getCreatedForums(user.getId());
		profileModel.setCreatedForums(createdForums);

		List<Event> createdEvents = eventDAO.getCreatedEvents(user.getId());
		profileModel.setCreatedEvents(createdEvents);

		List<Blog> createdBlogs = blogDAO.getCreatedBlogs(user.getId());
		profileModel.setCreatedBlogs(createdBlogs);

		List<Topic> createdTopics = topicDAO.getCreatedTopics(user.getId());
		profileModel.setCreatedTopics(createdTopics);

		List<Job> createdJobs = jobDAO.getCreatedJobs(user.getId());
		profileModel.setCreatedJobs(createdJobs);

		List<User> myFriends = friendDAO.myFriends(user.getId());
		List<User> friends = new ArrayList<>();

		for (User friend : myFriends) {
			if (friend.getId() != user.getId()) {
				friends.add(friend);
			}
		}
		profileModel.setMyFriends(friends);

		int noOfEvents = createdEvents.size();

		int noOfForums = createdForums.size();

		int noOfBlogs = createdBlogs.size();

		int noOfJobs = createdJobs.size();

		int noOfFriends = friends.size();

		// prevent frequently updating the user table
		if (user.getNoOfEvents() != noOfEvents || user.getNoOfForums() != noOfForums || user.getNoOfBlogs() != noOfBlogs
				|| user.getNoOfJobs() != noOfJobs || user.getNoOfFriends() != noOfFriends) {
			if (user.getNoOfEvents() != noOfEvents) {
				user.setNoOfEvents(noOfEvents);
			}

			if (user.getNoOfForums() != noOfForums) {
				user.setNoOfForums(noOfForums);
			}

			if (user.getNoOfBlogs() != noOfBlogs) {
				user.setNoOfBlogs(noOfBlogs);
			}

			if (user.getNoOfJobs() != noOfJobs) {
				user.setNoOfJobs(noOfJobs);
			}

			if (user.getNoOfFriends() != noOfFriends) {
				user.setNoOfFriends(noOfFriends);
			}

			userDAO.update(user);
		}

		return new ResponseEntity<ProfileModel>(profileModel, HttpStatus.OK);

	}

	// <!---------------------Social Links---------------------------!>

	@RequestMapping(value = "/user/add/socialLinks", method = RequestMethod.POST)
	public ResponseEntity<SocialLinks> addSocialLinks(@RequestBody SocialLinks socialLinks,
			@RequestParam("id") int id) {
		if (socialLinks != null) {
			if (socialLinks.getId() == 0) {
				socialLinks.setUser(user);
				socialLinksDAO.add(socialLinks);
			} else {
				socialLinks.setUser(user);
				socialLinksDAO.update(socialLinks);
			}
			return new ResponseEntity<SocialLinks>(HttpStatus.OK);
		} else {
			return new ResponseEntity<SocialLinks>(HttpStatus.NO_CONTENT);
		}
	}

	// <!--------------------Delete Social Link-------------------!>
	@RequestMapping(value = "/social/delete/{id}", method = RequestMethod.GET)
	public ResponseEntity<SocialLinks> deleteSocialLink(@PathVariable("id") int id) {

		socialLinks = socialLinksDAO.get(id);
		if (socialLinks != null) {
			boolean flag = socialLinksDAO.delete(socialLinks);
			if (flag != false) {
				return new ResponseEntity<SocialLinks>(HttpStatus.OK);
			} else {
				return new ResponseEntity<SocialLinks>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<SocialLinks>(HttpStatus.NOT_FOUND);
		}

	}

	// <!---------------------Loading Notification Module------------------!>

	@RequestMapping(value = "/notification/{id}", method = RequestMethod.GET)
	public ResponseEntity<NotificationModel> notificationModel(@PathVariable("id") int id) {

		NotificationModel notificationModel = new NotificationModel();

		int noOfPendingForums = forumDAO.getAllPendingForums().size();

		int noOfPendingJobs = jobDAO.listAllPendingJobs().size();

		int noOfPendingEvents = eventDAO.listAllPendingEvents().size();

		int noOfPendingTopics = topicDAO.getAllPendingTopics().size();

		int noOfPendingBlogs = blogDAO.getAllPendingBlogs().size();

		int noOfPendingUsers = userDAO.getAllPendingUsers().size();

		int noOfFriendRequest = friendDAO.listReceivedRequest(id).size();

		// Reported Section

		int noOfForumReported = reportDAO.getByCategory("FORUM").size();

		int noOfForumCommentReported = reportDAO.getByCategory("FORUM COMMENT").size();

		int noOfBlogCommentReported = reportDAO.getByCategory("BLOG COMMENT").size();

		int noOfTopicReported = reportDAO.getByCategory("TOPIC").size();

		int noOfTopicCommentReported = reportDAO.getByCategory("TOPIC COMMENT").size();

		int noOfUserReported = reportDAO.getByCategory("USER").size();

		int noOfEventReported = reportDAO.getByCategory("EVENT").size();

		int noOfJobReported = reportDAO.getByCategory("JOB").size();

		int noOfBlogReported = reportDAO.getByCategory("BLOG").size();

		int totalPendingRequest = noOfPendingForums + noOfPendingJobs + noOfPendingEvents + noOfPendingBlogs
				+ noOfPendingUsers + noOfPendingTopics;

		int totalReportedRequest = noOfForumReported + noOfEventReported + noOfJobReported + noOfBlogReported
				+ noOfTopicReported + noOfTopicCommentReported + noOfBlogCommentReported + noOfForumCommentReported
				+ noOfUserReported;

		notificationModel.setNoOfPendingBlogs(noOfPendingBlogs);
		notificationModel.setNoOfPendingEvents(noOfPendingEvents);
		notificationModel.setNoOfPendingForums(noOfPendingForums);
		notificationModel.setNoOfPendingJobs(noOfPendingJobs);
		notificationModel.setNoOfPendingUser(noOfPendingUsers);
		notificationModel.setNoOfPendingTopics(noOfPendingTopics);
		notificationModel.setTotalPendingRequest(totalPendingRequest);

		notificationModel.setNoOfFriendRequest(noOfFriendRequest);

		notificationModel.setNoOfBlogReported(noOfBlogReported);
		notificationModel.setNoOfEventReported(noOfEventReported);
		notificationModel.setNoOfForumReported(noOfForumReported);
		notificationModel.setNoOfJobReported(noOfJobReported);
		notificationModel.setNoOfBlogCommentReported(noOfBlogCommentReported);
		notificationModel.setNoOfForumCommentReported(noOfForumCommentReported);
		notificationModel.setNoOfTopicReported(noOfTopicReported);
		notificationModel.setNoOfTopicCommentReported(noOfTopicCommentReported);
		notificationModel.setNoOfUserReported(noOfUserReported);
		notificationModel.setTotalReportedRequest(totalReportedRequest);

		return new ResponseEntity<NotificationModel>(notificationModel, HttpStatus.OK);
	}

	/**
	 * 
	 * uploadFile method has three parameters directory - where to upload
	 * fileName - that will be used for naming the uploaded file file - the file
	 * to upload
	 * 
	 */

	private boolean uploadFile(String directory, String fileName, MultipartFile file) {

		// Create the directory if does not exists
		if (!new File(directory).exists()) {
			new File(directory).mkdirs();
		}

		try {
			// transfer the file
			file.transferTo(new File(directory + fileName));
			// file uploaded successfully
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return false;
	}

	// To resolve ${} in @Value
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	// <!---------------------------Upload Profile
	// Picture--------------------------!>
	@RequestMapping(value = { "/uploadProfile" }, method = RequestMethod.POST)
	public ResponseEntity<User> editUser(@RequestParam("file") MultipartFile file, @RequestParam("id") int id) {

		String fileName = "USER_PROFILE_" + id + ".png";
		user = userDAO.get(id);
		if (uploadFile(imageBasePath, fileName, file)) {
			user.setProfilePicture(fileName);
			userDAO.update(user);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

}
