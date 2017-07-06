package com.studenthub.entity;

import java.io.Serializable;

public class NotificationModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Declaring Private Fields
	 */

	private int noOfPendingForums;

	private int noOfPendingJobs;

	private int noOfPendingEvents;

	private int noOfPendingBlogs;

	private int noOfPendingTopics;

	private int noOfPendingUsers;

	private int totalPendingRequest;

	private int noOfForumReported;

	private int noOfForumCommentReported;

	private int noOfEventReported;

	private int noOfJobReported;

	private int noOfBlogReported;

	private int noOfBlogCommentReported;

	private int noOfTopicReported;

	private int noOfTopicCommentReported;

	private int noOfUserReported;

	private int totalReportedRequest;

	private int noOfFriendRequest;

	/*
	 * Accessors and Mutators OR Getters and Setters
	 */

	public int getNoOfPendingForums() {
		return noOfPendingForums;
	}

	public void setNoOfPendingForums(int noOfPendingForums) {
		this.noOfPendingForums = noOfPendingForums;
	}

	public int getNoOfPendingJobs() {
		return noOfPendingJobs;
	}

	public void setNoOfPendingJobs(int noOfPendingJobs) {
		this.noOfPendingJobs = noOfPendingJobs;
	}

	public int getNoOfPendingEvents() {
		return noOfPendingEvents;
	}

	public void setNoOfPendingEvents(int noOfPendingEvents) {
		this.noOfPendingEvents = noOfPendingEvents;
	}

	public int getNoOfPendingBlogs() {
		return noOfPendingBlogs;
	}

	public void setNoOfPendingBlogs(int noOfPendingBlogs) {
		this.noOfPendingBlogs = noOfPendingBlogs;
	}

	public int getNoOfForumReported() {
		return noOfForumReported;
	}

	public void setNoOfForumReported(int noOfForumReported) {
		this.noOfForumReported = noOfForumReported;
	}

	public int getNoOfEventReported() {
		return noOfEventReported;
	}

	public void setNoOfEventReported(int noOfEventReported) {
		this.noOfEventReported = noOfEventReported;
	}

	public int getNoOfJobReported() {
		return noOfJobReported;
	}

	public void setNoOfJobReported(int noOfJobReported) {
		this.noOfJobReported = noOfJobReported;
	}

	public int getNoOfForumCommentReported() {
		return noOfForumCommentReported;
	}

	public void setNoOfForumCommentReported(int noOfForumCommentReported) {
		this.noOfForumCommentReported = noOfForumCommentReported;
	}

	public int getNoOfBlogCommentReported() {
		return noOfBlogCommentReported;
	}

	public void setNoOfBlogCommentReported(int noOfBlogCommentReported) {
		this.noOfBlogCommentReported = noOfBlogCommentReported;
	}

	public int getNoOfTopicReported() {
		return noOfTopicReported;
	}

	public void setNoOfTopicReported(int noOfTopicReported) {
		this.noOfTopicReported = noOfTopicReported;
	}

	public int getNoOfTopicCommentReported() {
		return noOfTopicCommentReported;
	}

	public void setNoOfTopicCommentReported(int noOfTopicCommentReported) {
		this.noOfTopicCommentReported = noOfTopicCommentReported;
	}

	public int getNoOfUserReported() {
		return noOfUserReported;
	}

	public void setNoOfUserReported(int noOfUserReported) {
		this.noOfUserReported = noOfUserReported;
	}

	public int getNoOfBlogReported() {
		return noOfBlogReported;
	}

	public void setNoOfBlogReported(int noOfBlogReported) {
		this.noOfBlogReported = noOfBlogReported;
	}

	public int getNoOfPendingTopics() {
		return noOfPendingTopics;
	}

	public void setNoOfPendingTopics(int noOfPendingTopics) {
		this.noOfPendingTopics = noOfPendingTopics;
	}

	public int getNoOfPendingUser() {
		return noOfPendingUsers;
	}

	public void setNoOfPendingUser(int noOfPendingUsers) {
		this.noOfPendingUsers = noOfPendingUsers;
	}

	public int getTotalPendingRequest() {
		return totalPendingRequest;
	}

	public void setTotalPendingRequest(int totalPendingRequest) {
		this.totalPendingRequest = totalPendingRequest;
	}

	public int getTotalReportedRequest() {
		return totalReportedRequest;
	}

	public void setTotalReportedRequest(int totalReportedRequest) {
		this.totalReportedRequest = totalReportedRequest;
	}

	public int getNoOfFriendRequest() {
		return noOfFriendRequest;
	}

	public void setNoOfFriendRequest(int noOfFriendRequest) {
		this.noOfFriendRequest = noOfFriendRequest;
	}

	/**
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "NotificationModel [noOfPendingForums=" + noOfPendingForums + ", noOfPendingJobs=" + noOfPendingJobs
				+ ", noOfPendingEvents=" + noOfPendingEvents + ", noOfPendingBlogs=" + noOfPendingBlogs
				+ ", noOfPendingTopics=" + noOfPendingTopics + ", noOfPendingUsers=" + noOfPendingUsers
				+ ", totalPendingRequest=" + totalPendingRequest + ", noOfForumReported=" + noOfForumReported
				+ ", noOfForumCommentReported=" + noOfForumCommentReported + ", noOfEventReported=" + noOfEventReported
				+ ", noOfJobReported=" + noOfJobReported + ", noOfBlogReported=" + noOfBlogReported
				+ ", noOfBlogCommentReported=" + noOfBlogCommentReported + ", noOfTopicReported=" + noOfTopicReported
				+ ", noOfTopicCommentReported=" + noOfTopicCommentReported + ", noOfUserReported=" + noOfUserReported
				+ ", totalReportedRequest=" + totalReportedRequest + ", noOfFriendRequest=" + noOfFriendRequest + "]";
	}

}
