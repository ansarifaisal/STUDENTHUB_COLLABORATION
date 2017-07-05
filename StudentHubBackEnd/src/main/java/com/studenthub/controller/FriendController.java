package com.studenthub.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studenthub.dao.FriendDAO;
import com.studenthub.dao.UserDAO;
import com.studenthub.entity.Friend;
import com.studenthub.entity.User;

@RestController
public class FriendController {

	@Autowired
	User user;

	@Autowired
	UserDAO userDAO;

	@Autowired
	Friend friend;

	@Autowired
	FriendDAO friendDAO;

	// <!-------------------Send Friend Request-------------------!>
	@RequestMapping(value = "/user/request/friend", method = RequestMethod.POST)
	public ResponseEntity<Friend> sendFriendRequest(@RequestBody Friend friend) {

		if (friend != null) {
			boolean flag = friendDAO.addFriend(friend);
			if (flag != false) {
				return new ResponseEntity<Friend>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(HttpStatus.NOT_IMPLEMENTED);
			}
		} else {
			return new ResponseEntity<Friend>(HttpStatus.NO_CONTENT);
		}

	}

	// <!--------------------Fetch Friend----------------------!>
	@RequestMapping(value = "/user/friends/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> fetchFriends(@PathVariable("id") int id) {
		// all user fetched along with user id
		List<User> users = friendDAO.myFriends(id);
		// creating new list to send only friends id
		List<User> friends = new ArrayList<>();
		// traversing the list
		for (User user : users) {
			// prevent adding requested user
			if (user.getId() != id) {
				// adding friends into the list
				friends.add(user);
			}
		}
		// sending friends to the front end
		return new ResponseEntity<List<User>>(friends, HttpStatus.OK);
	}

	// <!-------------------Fetch Sent Requests--------------------!>
	@RequestMapping(value = "/user/sent/request/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> fetchSendRequest(@PathVariable("id") int id) {
		List<Friend> friends = friendDAO.listSentRequest(id);
		List<User> requests = new ArrayList<>();
		for (Friend friend : friends) {
			user = userDAO.get(friend.getFriendId());
			requests.add(user);
		}
		return new ResponseEntity<List<User>>(requests, HttpStatus.OK);
	}

	// <!----------------Fetch Received Requests---------------------!>
	@RequestMapping(value = "/user/sent/receive/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> fetchReceiveRequest(@PathVariable("id") int id) {
		List<Friend> friends = friendDAO.listReceivedRequest(id);
		List<User> requests = new ArrayList<>();
		for (Friend friend : friends) {
			user = userDAO.get(friend.getInitiaterId());
			requests.add(user);
		}
		return new ResponseEntity<List<User>>(requests, HttpStatus.OK);
	}

}
