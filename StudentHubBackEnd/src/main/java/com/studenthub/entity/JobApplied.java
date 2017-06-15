package com.studenthub.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

@Entity(name = "JOB_APPLIED")
@Component
public class JobApplied implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "JOB_APPLIED_SEQ", allocationSize = 1)
	@Column(name = "APPLIED_ID", nullable = false)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "JOB_ID", nullable = false)
	private Job job;
	
	@Column(name = "USER_ID", nullable = false)
	private int userId;
	
	@Column(name = "USER_NAME", nullable = false)
	private String userName;
	
	@Column(name = "APPLIED_DATE", nullable = false)
	private LocalDateTime appliedDate;
	
	@Column(name = "STATUS", nullable = false)
	private String status;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
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

	public LocalDateTime getAppliedDate() {
		return appliedDate;
	}

	public void setAppliedDate(LocalDateTime appliedDate) {
		this.appliedDate = appliedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
