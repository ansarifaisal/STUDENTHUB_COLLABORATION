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

	// <!-----------------------Get Online Friends------------------!>

	@RequestMapping(value = "/user/friends/online/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> fetchOnlineFriends(@PathVariable("id") int id) {
		// all user fetched along with user id
		List<User> users = friendDAO.myFriends(id);
		// creating new list to send only friends id
		List<User> friends = new ArrayList<>();
		// traversing the list
		for (User user : users) {
			// prevent adding requested user
			if (user.getId() != id) {
				if (user.getIsOnline().equals("TRUE")) {
					// adding friends into the list
					friends.add(user);
				}
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
	@RequestMapping(value = "/user/request/receive/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> fetchReceiveRequest(@PathVariable("id") int id) {
		List<Friend> friends = friendDAO.listReceivedRequest(id);
		List<User> requests = new ArrayList<>();
		for (Friend friend : friends) {
			user = userDAO.get(friend.getInitiaterId());
			requests.add(user);
		}
		return new ResponseEntity<List<User>>(requests, HttpStatus.OK);
	}

	// <!---------------------Approve Friend Request-------------------!>
	@RequestMapping(value = "/user/approve/{initiaterId}/{friendId}", method = RequestMethod.GET)
	public ResponseEntity<Friend> approveRequest(@PathVariable("initiaterId") int initiaterId,
			@PathVariable("friendId") int friendId) {
		friend = friendDAO.getFriend(initiaterId, friendId);
		if (friend != null) {
			friend.setStatus("APPROVED");
			boolean flag = friendDAO.updateFriend(friend);
			if (flag != false) {

				User initiaterUser = userDAO.get(initiaterId);
				int initiaterFrnds = initiaterUser.getNoOfFriends() + 1;
				initiaterUser.setNoOfFriends(initiaterFrnds);
				userDAO.update(initiaterUser);

				User friendUser = userDAO.get(friendId);
				int friendFrnds = friendUser.getNoOfFriends() + 1;
				friendUser.setNoOfFriends(friendFrnds);
				userDAO.update(friendUser);

				return new ResponseEntity<Friend>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(HttpStatus.NOT_IMPLEMENTED);
			}
		} else {
			return new ResponseEntity<Friend>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Reject Request---------------------------!>
	@RequestMapping(value = "/user/reject/{initiaterId}/{friendId}", method = RequestMethod.GET)
	public ResponseEntity<Friend> rejectRequest(@PathVariable("initiaterId") int initiaterId,
			@PathVariable("friendId") int friendId) {
		// get friend
		friend = friendDAO.getFriend(initiaterId, friendId);
		// if not found then perform the this
		if (friend == null) {
			int temp = initiaterId;
			initiaterId = friendId;
			friendId = temp;
			friend = friendDAO.getFriend(initiaterId, friendId);
			if (friend != null) {
				friendDAO.deleteFriend(friend);
				User initiaterUser = userDAO.get(initiaterId);
				int initiaterFrnds = initiaterUser.getNoOfFriends() - 1;
				initiaterUser.setNoOfFriends(initiaterFrnds);
				userDAO.update(initiaterUser);

				User friendUser = userDAO.get(friendId);
				int friendFrnds = friendUser.getNoOfFriends() - 1;
				friendUser.setNoOfFriends(friendFrnds);
				userDAO.update(initiaterUser);
				return new ResponseEntity<Friend>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(HttpStatus.NO_CONTENT);
			}
		} else {
			if (friend != null) {

				friendDAO.deleteFriend(friend);
				User initiaterUser = userDAO.get(initiaterId);
				int initiaterFrnds = initiaterUser.getNoOfFriends() - 1;
				initiaterUser.setNoOfFriends(initiaterFrnds);
				userDAO.update(initiaterUser);

				User friendUser = userDAO.get(friendId);
				int friendFrnds = friendUser.getNoOfFriends() - 1;
				friendUser.setNoOfFriends(friendFrnds);
				userDAO.update(initiaterUser);
				return new ResponseEntity<Friend>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(HttpStatus.NOT_IMPLEMENTED);
			}
		}
	}

	// <!-------------------------Cancel Request--------------------!>
	@RequestMapping(value = "/user/cancel/{initiaterId}/{friendId}", method = RequestMethod.GET)
	public ResponseEntity<Friend> cancelRequest(@PathVariable("initiaterId") int initiaterId,
			@PathVariable("friendId") int friendId) {

		friend = friendDAO.getFriend(initiaterId, friendId);
		if (friend == null) {
			int temp = initiaterId;
			initiaterId = friendId;
			friendId = temp;
			friend = friendDAO.getFriend(initiaterId, friendId);
			if (friend != null) {
				friendDAO.deleteFriend(friend);
				return new ResponseEntity<Friend>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(HttpStatus.NOT_IMPLEMENTED);
			}
		} else {
			boolean flag = friendDAO.deleteFriend(friend);
			if (flag != false) {
				return new ResponseEntity<Friend>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(HttpStatus.NO_CONTENT);
			}
		}
	}

	// <!-----------------fetch Users Other Than Friends---------------------!>
	@RequestMapping(value = "/user/nofriend/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> fetchUsers(@PathVariable("id") int id) {
		List<User> users = friendDAO.noFriends(id);
		List<User> noFrnd = new ArrayList<>();
		for (User user : users) {
			if (user.getId() != id) {
				noFrnd.add(user);
			}
		}
		if (!noFrnd.isEmpty()) {
			return new ResponseEntity<List<User>>(noFrnd, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------Check Whether User Is Friend------------------!>
	@RequestMapping(value = "/user/checkFrnd/{initiaterId}/{friendId}", method = RequestMethod.GET)
	public ResponseEntity<Friend> checkFriend(@PathVariable("initiaterId") int initiaterId,
			@PathVariable("friendId") int friendId) {
		friend = friendDAO.getFriend(initiaterId, friendId);
		if (friend == null) {
			int temp = initiaterId;
			initiaterId = friendId;
			friendId = temp;
			friend = friendDAO.getFriend(initiaterId, friendId);
			if (friend != null) {
				return new ResponseEntity<Friend>(friend, HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(friend, HttpStatus.OK);
			}
		} else {
			if (friend != null) {
				return new ResponseEntity<Friend>(friend, HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(friend, HttpStatus.OK);
			}
		}
	}

	// <!---------------------Check Whether User Is Friend------------------!>
	@RequestMapping(value = "/user/checkFrndByUser/{initiaterUserName}/{friendUserName}", method = RequestMethod.GET)
	public ResponseEntity<Friend> checkFriendByUserName(@PathVariable("initiaterUserName") String initiaterUserName,
			@PathVariable("friendUserName") String friendUserName) {
		User initiater = userDAO.getByUserName(initiaterUserName);
		User tempFriend= userDAO.getByUserName(friendUserName);
		int initiaterId = initiater.getId();
		int friendId = tempFriend.getId();
		friend = friendDAO.getFriend(initiaterId, friendId);
		if (friend == null) {
			int temp = initiaterId;
			initiaterId = friendId;
			friendId = temp;
			friend = friendDAO.getFriend(initiaterId, friendId);
			if (friend != null) {
				return new ResponseEntity<Friend>(friend, HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(friend, HttpStatus.OK);
			}
		} else {
			if (friend != null) {
				return new ResponseEntity<Friend>(friend, HttpStatus.OK);
			} else {
				return new ResponseEntity<Friend>(friend, HttpStatus.OK);
			}
		}
	}

}
