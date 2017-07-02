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

@Entity(name = "EVENT_JOINED")
@Component
public class EventJoined implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring private fields
	 */
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "EVENT_JOINED_SEQ", allocationSize = 1)
	@Column(name = "JOINED_ID", nullable = false)
	private int id;

	@ManyToOne
	@JoinColumn(name = "EVENT_ID", nullable = false)
	@JsonBackReference
	private Event event;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "STATUS", nullable = false)
	private String status;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
