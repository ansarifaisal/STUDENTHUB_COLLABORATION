package com.studenthub.testcase;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.UserDAO;
import com.studenthub.entity.User;

import junit.framework.Assert;

public class UserDAOTestCases {

	@Autowired
	User user;

	@Autowired
	UserDAO userDAO;

	@Autowired
	AnnotationConfigApplicationContext context;

	public UserDAOTestCases() {
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		user = (User) context.getBean("user");
		userDAO = (UserDAO) context.getBean("userDAO");
	}

	@Test
	public void addUsetTestCase() {
		user.setId(1);
		user.setEmail("ansarifaisal480@gmail.com");
		user.setUserName("ansarifaisal");
		user.setFirstName("Faisal");
		user.setLastName("Ansari");
		user.setGender("Male");
		user.setPassword("testtest");
		user.setDob("1995-01-26");
		user.setDoj("2017-02-17");
		user.setRole("Super_Admin");
		user.setIsOnline("TRUE");
		user.setProfilePicture("profileExample.jpg");
		user.setStatus("APPROVED");
		Assert.assertEquals(true, userDAO.add(user));
	}

	/*
	 * @Test public void getTestCase(){ user = userDAO.get(3);
	 * Assert.assertEquals(3, user.getId()); }
	 */

	/*
	 * @Test public void getByUserNameTestCase(){ user =
	 * userDAO.getByUserName("ansarifaisal480"); Assert.assertEquals(3,
	 * user.getId()); }
	 */

	/*
	 * @Test public void editTestCase(){ user = userDAO.get(3);
	 * user.setGender("Female"); Assert.assertEquals("Valid Test: ",true,
	 * userDAO.edit(user));
	 * 
	 * }
	 */

	/*
	 * @Test public void deleteTestCase(){ user = userDAO.get(3);
	 * Assert.assertEquals(false, userDAO.delete(user)); }
	 */
}
