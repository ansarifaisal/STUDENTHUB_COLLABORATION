package com.studenthub.entity;

import java.io.Serializable;
import java.util.List;

public class ProfileModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Fields
	 */

	private User user;

	private List<Blog> createdBlogs;

	private List<Topic> createdTopics;

	private List<Forum> createdForums;

	private List<Event> createdEvents;

	private List<Job> createdJobs;

	private List<User> myFriends;

	/*
	 * Declaring Accessers and Mutators
	 */

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Blog> getCreatedBlogs() {
		return createdBlogs;
	}

	public void setCreatedBlogs(List<Blog> createdBlogs) {
		this.createdBlogs = createdBlogs;
	}

	public List<Topic> getCreatedTopics() {
		return createdTopics;
	}

	public void setCreatedTopics(List<Topic> createdTopics) {
		this.createdTopics = createdTopics;
	}

	public List<Forum> getCreatedForums() {
		return createdForums;
	}

	public void setCreatedForums(List<Forum> createdForums) {
		this.createdForums = createdForums;
	}

	public List<Event> getCreatedEvents() {
		return createdEvents;
	}

	public void setCreatedEvents(List<Event> createdEvents) {
		this.createdEvents = createdEvents;
	}

	public List<Job> getCreatedJobs() {
		return createdJobs;
	}

	public void setCreatedJobs(List<Job> createdJobs) {
		this.createdJobs = createdJobs;
	}

	public List<User> getMyFriends() {
		return myFriends;
	}

	public void setMyFriends(List<User> myFriends) {
		this.myFriends = myFriends;
	}

	/*
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "ProfileModel [user=" + user + ", createdBlogs=" + createdBlogs + ", createdTopics=" + createdTopics
				+ ", createdForums=" + createdForums + ", createdEvents=" + createdEvents + ", createdJobs="
				+ createdJobs + ", myFriends=" + myFriends + "]";
	}

}
