package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Friend;

public interface FriendDAO {
	
	List<Friend> list();
	
	Friend getFriend(int id);
	
	boolean addFriend(Friend friend);
	
	boolean deleteFriend(Friend friend);
	
}
