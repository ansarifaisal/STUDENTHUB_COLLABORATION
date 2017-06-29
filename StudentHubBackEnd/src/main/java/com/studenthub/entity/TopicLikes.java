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

@Entity(name = "TOPIC_LIKES")
@Component
public class TopicLikes extends Domain implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "TOPIC_LIKES_SEQ", allocationSize = 1)
	@Column(name = "ID", nullable = false)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "TOPIC_ID", nullable = false)
	@JsonBackReference
	private Topic topic;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "DATE_TIME", nullable = false)
	private String dateTime;

	/*
	 * Declaring Private Fields
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Topic getTopic() {
		return topic;
	}

	public void setTopic(Topic topic) {
		this.topic = topic;
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

	/**
	 * Overriding toString Method for debugging
	 */

	@Override
	public String toString() {
		return "TopicLikes [id=" + id + ", topic=" + topic + ", userId=" + userId + ", userName=" + userName
				+ ", dateTime=" + dateTime + "]";
	}

}
