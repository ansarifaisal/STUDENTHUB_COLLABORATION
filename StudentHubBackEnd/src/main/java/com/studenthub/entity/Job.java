package com.studenthub.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

@Entity(name = "JOBS")
@Component
public class Job implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring private fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "JOBS_SEQ", allocationSize = 1)
	@Column(name = "JOB_ID", nullable = false)
	private int id;

	@Column(name = "TITLE", nullable = false)
	private String title;

	@Column(name = "COMPANY", nullable = false)
	private String company;

	@Column(name = "EXPERIENCE", nullable = false)
	private int experience;

	@Column(name = "DESCRIPTION", nullable = false)
	private String description;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "QUALIFICATION", nullable = false)
	private String qualification;

	@Column(name = "POST_DATE", nullable = false)
	private String postDate;

	@Column(name = "SALARY", nullable = false)
	private int salary;

	@Column(name = "KEYSKILLS", nullable = false)
	private String keySkills;

	@Column(name = "LOCATION", nullable = false)
	private String location;
	
	@Column(name = "NO_OF_APPLIED", nullable = false)
	private int noOfApplied;

	@Column(name = "REPORT", nullable = false)
	private String report;

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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getPostDate() {
		return postDate;
	}

	public void setPostDate(String postDate) {
		this.postDate = postDate;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public String getKeySkills() {
		return keySkills;
	}

	public void setKeySkills(String keySkills) {
		this.keySkills = keySkills;
	}

	public int getNoOfApplied() {
		return noOfApplied;
	}

	public void setNoOfApplied(int noOfApplied) {
		this.noOfApplied = noOfApplied;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
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
		return "Job [id=" + id + ", title=" + title + ", company=" + company + ", experience=" + experience
				+ ", description=" + description + ", userId=" + userId + ", userName=" + userName + ", qualification="
				+ qualification + ", postDate=" + postDate + ", salary=" + salary + ", keySkills=" + keySkills
				+ ", location=" + location + ", report=" + report + ", status=" + status + "]";
	}

}
