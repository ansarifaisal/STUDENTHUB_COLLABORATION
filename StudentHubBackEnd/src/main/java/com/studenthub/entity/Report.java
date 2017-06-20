package com.studenthub.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

@Entity(name = "REPORTS")
@Component
public class Report implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "REPORTS_SEQ", allocationSize = 1)
	@Column(name = "ID", nullable = false)
	private int id;

	@Column(name = "USERNAME", nullable = false)
	private String userName;

	@Column(name = "USER_ID", nullable = false)
	private String userId;

	@Column(name = "TITLE", nullable = false)
	private String title;

	@Column(name = "TYPE_OF_REPORT", nullable = false)
	private String typeOfReport;

	@Column(name = "DATE_TIME", nullable = false)
	private String dateTime;

	@Column(name = "DETAILS", nullable = false)
	private String details;

	@Column(name = "REPORTED_ID", nullable = false)
	private int reportId;

	@Column(name = "COMMENT_ID")
	private int commentId;

	@Column(name = "STATUS", nullable = false)
	private String status;

	/*
	 * Accessors and Mutators
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTypeOfReport() {
		return typeOfReport;
	}

	public void setTypeOfReport(String typeOfReport) {
		this.typeOfReport = typeOfReport;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public int getReportId() {
		return reportId;
	}

	public void setReportId(int reportId) {
		this.reportId = reportId;
	}

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
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
		return "Report [id=" + id + ", userName=" + userName + ", userId=" + userId + ", title=" + title
				+ ", typeOfReport=" + typeOfReport + ", dateTime=" + dateTime + ", details=" + details + ", reportId="
				+ reportId + ", commentId=" + commentId + ", status=" + status + "]";
	}

}
