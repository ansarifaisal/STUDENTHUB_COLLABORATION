package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.User;

public interface UserDAO {

	User get(int id);
	
	List<User> getAllPendingUsers();
	
	User getByUserName(String userName);
	
	List<User> list();
	
	User isValidate(User user);
	
	boolean add(User user);
	
	boolean update(User user);
	
	boolean delete(User user);
}
