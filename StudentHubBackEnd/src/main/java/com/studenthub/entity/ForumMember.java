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

@Entity(name = "FORUM_MEMBERS")
@Component
public class ForumMember implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring private fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "FORUM_REQUEST_SEQ", allocationSize = 1)
	@Column(name = "MEMBER_ID", nullable = false)
	private int id;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "FORUM_ID", nullable = false)
	private Forum forum;

	@Column(name = "REQUEST_DATE", nullable = false)
	private String requestDate;

	@Column(name = "STATUS", nullable = false)
	private String status;

	/*
	 * Accessors And Mutators OR Getter and Setter
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

	public String getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	/*
	 * Overriding toString Method for Debugging
	 */

	@Override
	public String toString() {
		return "ForumMember [id=" + id + ", userId=" + userId + ", userName=" + userName + ", forum=" + forum
				+ ", requestDate=" + requestDate + ", status=" + status + "]";
	}

}
