package com.studenthub.entity;

import java.io.Serializable;
import java.util.List;

public class UserModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Field
	 */

	private List<Blog> latestBlogs;

	private List<Job> latestJobs;

	private List<Forum> latestForums;

	private List<Event> latestEvents;

	private List<Topic> latestTopics;

	/*
	 * Accessers and Mutators
	 */

	public List<Blog> getlatestBlogs() {
		return latestBlogs;
	}

	public void setlatestBlogs(List<Blog> latestBlogs) {
		this.latestBlogs = latestBlogs;
	}

	public List<Job> getlatestJobs() {
		return latestJobs;
	}

	public void setlatestJobs(List<Job> latestJobs) {
		this.latestJobs = latestJobs;
	}

	public List<Forum> getlatestForums() {
		return latestForums;
	}

	public void setlatestForums(List<Forum> latestForums) {
		this.latestForums = latestForums;
	}

	public List<Event> getlatestEvents() {
		return latestEvents;
	}

	public void setlatestEvents(List<Event> latestEvents) {
		this.latestEvents = latestEvents;
	}

	public List<Topic> getlatestTopics() {
		return latestTopics;
	}

	public void setlatestTopics(List<Topic> latestTopics) {
		this.latestTopics = latestTopics;
	}

	/*
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "UserModel [latestBlogs=" + latestBlogs + ", latestJobs=" + latestJobs + ", latestForums=" + latestForums
				+ ", latestEvents=" + latestEvents + ", latestTopics=" + latestTopics + "]";
	}

}
