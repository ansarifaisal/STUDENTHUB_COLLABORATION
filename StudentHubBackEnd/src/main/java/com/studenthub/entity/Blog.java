package com.studenthub.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

@Entity(name = "BLOGS")
@Component
public class Blog extends Domain implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Field
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "BLOGS_SEQ", allocationSize = 1)
	@Column(name = "BLOG_ID", nullable = false)
	private int blogId;

	@Column(name = "TITLE", nullable = false)
	private String title;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "DESCRIPTION", nullable = false)
	private String description;

	@Column(name = "POST_DATE", nullable = false)
	private String postDate;

	@Column(name = "NO_OF_COMMENTS", nullable = false)
	private int noOfComments;

	@Column(name = "NO_OF_LIKES", nullable = false)
	private int noOfLikes;

	@Column(name = "STATUS", nullable = false)
	private String status;

	@Column(name = "REPORT", nullable = false)
	private String report;

	@Column(name = "IMAGE_URL", nullable = false)
	private String imageUrl;


	/*
	 * Getters and Setters OR Accessors and Mutators
	 */

	public int getBlogId() {
		return blogId;
	}

	public void setBlogId(int blogId) {
		this.blogId = blogId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPostDate() {
		return postDate;
	}

	public void setPostDate(String postDate) {
		this.postDate = postDate;
	}

	public int getNoOfComments() {
		return noOfComments;
	}

	public void setNoOfComments(int noOfComments) {
		this.noOfComments = noOfComments;
	}

	public int getNoOfLikes() {
		return noOfLikes;
	}

	public void setNoOfLikes(int noOfLikes) {
		this.noOfLikes = noOfLikes;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	/*
	 * Overriding toString Method For Debugging
	 */
	
	@Override
	public String toString() {
		return "Blog [blogId=" + blogId + ", title=" + title + ", userId=" + userId + ", userName=" + userName
				+ ", description=" + description + ", postDate=" + postDate + ", noOfComments=" + noOfComments
				+ ", noOfLikes=" + noOfLikes + ", status=" + status + ", report=" + report + ", imageUrl=" + imageUrl
				+ "]";
	}

}
