package com.studenthub.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

@Entity(name = "FORUMS")
@Component
public class Forum extends Domain implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring private fields
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "FORUMS_SEQ", allocationSize = 1)
	@Column(name = "FORUM_ID", nullable = false)
	private int id;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "FORUM_NAME", nullable = false)
	private String forumName;

	@Column(name = "FORUM_DESCRIPTION", nullable = false)
	private String forumDescription;

	@Column(name = "CREATED_DATE", nullable = false)
	private String createdDate;

	@Column(name = "NO_OF_REQUEST", nullable = false)
	private int noOfRequest;

	@Column(name = "IMAGE_URL", nullable = false)
	private String imageURL;

	@Column(name = "NUMBER_OF_MEMBERS", nullable = false)
	private int noOfMembers;

	@Column(name = "NUMBER_OF_TOPICS", nullable = false)
	private int noOfTopics;

	@Column(name = "REPORT", nullable = false)
	private String report;

	@Column(name = "STATUS", nullable = false)
	private String status;
	//
	// @OneToMany(cascade = CascadeType.ALL, mappedBy = "forum", fetch =
	// FetchType.EAGER)
	// private List<ForumComment> forumComment;
	//
	// @OneToMany(cascade = CascadeType.ALL, mappedBy = "forum", fetch =
	// FetchType.EAGER)
	// private List<ForumRequest> forumRequest;
	//
	// @OneToMany(cascade = CascadeType.ALL, mappedBy = "forum", fetch =
	// FetchType.EAGER)
	// private List<Topic> topics;

	/*
	 * Accessors and Mutators Or getters and setters
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getForumName() {
		return forumName;
	}

	public void setForumName(String forumName) {
		this.forumName = forumName;
	}

	public String getForumDescription() {
		return forumDescription;
	}

	public void setForumDescription(String forumDescription) {
		this.forumDescription = forumDescription;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public int getNoOfRequest() {
		return noOfRequest;
	}

	public void setNoOfRequest(int noOfRequest) {
		this.noOfRequest = noOfRequest;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public int getNoOfMembers() {
		return noOfMembers;
	}

	public void setNoOfMembers(int noOfMembers) {
		this.noOfMembers = noOfMembers;
	}

	public int getNoOfTopics() {
		return noOfTopics;
	}

	public void setNoOfTopics(int noOfTopics) {
		this.noOfTopics = noOfTopics;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	// public List<ForumComment> getForumComment() {
	// return forumComment;
	// }
	//
	// public void setForumComment(List<ForumComment> forumComment) {
	// this.forumComment = forumComment;
	// }
	//
	// public List<ForumRequest> getForumRequest() {
	// return forumRequest;
	// }
	//
	// public void setForumRequest(List<ForumRequest> forumRequest) {
	// this.forumRequest = forumRequest;
	// }
	//
	// public List<Topic> getTopics() {
	// return topics;
	// }
	//
	// public void setTopics(List<Topic> topics) {
	// this.topics = topics;
	// }

	// /*Overriding toString Method For Debugging*/
	// @Override
	// public String toString() {
	// return "Forum [id=" + id + ", userId=" + userId + ", userName=" +
	// userName + ", forumName=" + forumName
	// + ", createdDate=" + createdDate + ", noOfRequest=" + noOfRequest + ",
	// imageURL=" + imageURL
	// + ", noOfMembers=" + noOfMembers + ", noOfTopics=" + noOfTopics + ",
	// report=" + report + ", status="
	// + status + ", forumComment=" + forumComment + ", forumRequest=" +
	// forumRequest + ", topics=" + topics
	// + "]";
	// }

}
