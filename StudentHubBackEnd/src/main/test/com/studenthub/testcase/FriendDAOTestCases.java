package com.studenthub.testcase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.FriendDAO;
import com.studenthub.entity.Friend;

public class FriendDAOTestCases {

	@Autowired
	Friend friend;

	@Autowired
	FriendDAO friendDAO;

	@Autowired
	AnnotationConfigApplicationContext context;
	
	public FriendDAOTestCases(){
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		friend = (Friend) context.getBean("friend");
		friendDAO = (FriendDAO) context.getBean("friendDAO");
	}
	
	/*@Test
	public void addFriendTestCase(){
		friend.setFriendId(1);
		friend.setInitiaterId(2);
		friend.setStatus("PENDING");
		Assert.assertEquals(true, friendDAO.addFriend(friend));
	}*/
	
	/*@Test
	public void deleteFriendTestCase(){
		friend = friendDAO.getFriend(1);
		Assert.assertEquals(true, friendDAO.deleteFriend(friend));
	}*/
}
