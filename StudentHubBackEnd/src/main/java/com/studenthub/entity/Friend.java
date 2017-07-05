package com.studenthub.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

@Entity(name = "FRIENDS")
@Component
public class Friend implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "FRIENDS_SEQ", allocationSize = 1)
	@Column(name = "ID", nullable = false)
	private int id;

	@Column(name = "INITIATER_ID", nullable = false)
	private int initiaterId;

	@Column(name = "FRIEND_ID", nullable = false)
	private int friendId;

	@Column(name = "STATUS", nullable = false)
	private String status;

	/*
	 * Getters and Setters
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getInitiaterId() {
		return initiaterId;
	}

	public void setInitiaterId(int initiaterId) {
		this.initiaterId = initiaterId;
	}

	public int getFriendId() {
		return friendId;
	}

	public void setFriendId(int friendId) {
		this.friendId = friendId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * Overriding toString Method For Debugging
	 */
	
	@Override
	public String toString() {
		return "Friend [id=" + id + ", initiaterId=" + initiaterId + ", friendId=" + friendId + ", status=" + status
				+ "]";
	}
	
	
}
