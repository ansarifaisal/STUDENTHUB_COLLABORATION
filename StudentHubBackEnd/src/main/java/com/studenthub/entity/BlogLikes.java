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

@Entity(name = "BLOG_LIKES")
@Component
public class BlogLikes implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Fields
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "BLOG_LIKES_SEQ", allocationSize = 1)
	@Column(name = "ID", nullable = false)
	private int id;

	@ManyToOne
	@JoinColumn(name = "BLOG_ID", nullable = false)
	@JsonBackReference
	private Blog blog;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "DATE_TIME", nullable = false)
	private String dateTime;

	/* Accessors and Mutattors */

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

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	/*
	 * Overriding toString Method For Debugging
	 */
	
	@Override
	public String toString() {
		return "BlogLikes [id=" + id + ", blog=" + blog + ", userId=" + userId + ", userName=" + userName
				+ ", dateTime=" + dateTime + "]";
	}
	
	

}
