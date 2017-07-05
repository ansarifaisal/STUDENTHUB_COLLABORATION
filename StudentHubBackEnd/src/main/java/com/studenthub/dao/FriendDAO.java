package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Friend;
import com.studenthub.entity.User;

public interface FriendDAO {

	List<Friend> list();

	List<Friend> listSentRequest(int id);

	List<Friend> listReceivedRequest(int id);
	
	List<User> noFriends(int id);

	List<User> myFriends(int id);

	Friend getFriend(int id);

	boolean addFriend(Friend friend);

	boolean updateFriend(Friend friend);

	boolean deleteFriend(Friend friend);

}
