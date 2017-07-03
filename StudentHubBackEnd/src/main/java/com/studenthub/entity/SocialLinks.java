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

@Entity(name = "SOCIAL_LINKS")
@Component
public class SocialLinks implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "SOCIAL_LINKS_SEQ", allocationSize = 1)
	@Column(name = "ID", nullable = false)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "USER_ID", nullable = false)
	@JsonBackReference
	private User user;

	@Column(name = "BELONGS", nullable = false)
	private String belongs;

	@Column(name = "DETAIL", nullable = false)
	private String details;

	/*
	 * Accessors And Mutators
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getBelongs() {
		return belongs;
	}

	public void setBelongs(String belongs) {
		this.belongs = belongs;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	/**
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "SocialLinks [id=" + id + ", user=" + user + ", belongs=" + belongs + ", details=" + details + "]";
	}

}
