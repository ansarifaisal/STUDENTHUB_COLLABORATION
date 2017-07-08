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

@Entity(name = "BLOG_COMMENTS")
@Component
public class BlogComment implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "BLOG_COMMENTS_SEQ", allocationSize = 1)
	@Column(name = "BLOG_COMMENT_ID", nullable = false)
	private int id;

	@ManyToOne
	@JoinColumn(name = "BLOG_ID", nullable = false)
	private Blog blog;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "IMAGE_URL", nullable = false)
	private String imageURL;

	@Column(name = "BLOG_COMMENT", nullable = false)
	private String blogComment;

	@Column(name = "COMMENT_DATE", nullable = false)
	private String commentDate;

	@Column(name = "NO_OF_LIKES", nullable = false)
	private int noOfLikes;

	@Column(name = "REPORT", nullable = false)
	private String report;

	/*
	 * Getters and Setters or Accessors and Mutators
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Blog getBlog() {
		return blog;
	}

	public void setBlog(Blog blog) {
		this.blog = blog;
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

	public String getBlogComment() {
		return blogComment;
	}

	public void setBlogComment(String blogComment) {
		this.blogComment = blogComment;
	}

	public String getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(String commentDate) {
		this.commentDate = commentDate;
	}

	public int getNoOfLikes() {
		return noOfLikes;
	}

	public void setNoOfLikes(int noOfLikes) {
		this.noOfLikes = noOfLikes;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	/*
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "BlogComment [id=" + id + ", blog=" + blog + ", userId=" + userId + ", userName=" + userName
				+ ", imageURL=" + imageURL + ", blogComment=" + blogComment + ", commentDate=" + commentDate
				+ ", noOfLikes=" + noOfLikes + ", report=" + report + "]";
	}

}
