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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity(name = "FORUM_COMMENTS")
@Component
public class ForumComment implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "FORUM_COMMENTS_SEQ", allocationSize = 1)
	@Column(name = "FORUM_COMMENT_ID", nullable = false)
	private int id;

	@ManyToOne
	@JoinColumn(name = "FORUM_ID", nullable = false)
	@JsonBackReference
	private Forum forum;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "FORUM_COMMENT", nullable = false)
	private String comment;

	@Column(name = "COMMENT_DATE", nullable = false)
	private String commentDate;

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

	public Forum getForum() {
		return forum;
	}

	public void setForum(Forum forum) {
		this.forum = forum;
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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(String commentDate) {
		this.commentDate = commentDate;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}

	/**
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "ForumComment [id=" + id + ", forum=" + forum + ", userId=" + userId + ", userName=" + userName
				+ ", comment=" + comment + ", commentDate=" + commentDate + ", report=" + report + "]";
	}
}
