package com.studenthub.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

@Entity(name = "TOPICS")
@Component
public class Topic extends Domain implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring private fields
	 */
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "TOPICS_SEQ", allocationSize = 1)
	@Column(name = "TOPIC_ID", nullable = false)
	private int id;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@ManyToOne
	@JoinColumn(name = "FORUM_ID", nullable = false)
	private Forum forum;

	@Column(name = "TITLE", nullable = false)
	private String title;
	
	@Column(name = "IMAGE_URL", nullable = false)
	private String imageURL;
	
	@Column(name = "DESCRIPTION", nullable = false)
	private String description;
	
	@Column(name = "CREATED_DATE", nullable = false)
	private String createdDate;

	@Column(name = "REPORT", nullable = false)
	private String report;
	
	@Column(name = "STATUS", nullable = false)
	private String status;

	/*
	 * Accessors And Mutators OR Getters and Setters
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

	public Forum getForum() {
		return forum;
	}

	public void setForum(Forum forum) {
		this.forum = forum;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
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


	/*
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "Topic [id=" + id + ", userId=" + userId + ", userName=" + userName + ", forum=" + forum + ", title="
				+ title + ", imageURL=" + imageURL + ", description=" + description + ", createdDate=" + createdDate
				+ ", report=" + report + ", status=" + status + "]";
	}
	
}
