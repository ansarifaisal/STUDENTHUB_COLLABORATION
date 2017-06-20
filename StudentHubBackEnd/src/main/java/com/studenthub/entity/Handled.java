package com.studenthub.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

@Entity(name = "HANDLED")
@Component
public class Handled implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "HANDLED_SEQ", allocationSize = 1)
	@Column(name = "ID", nullable = false)
	private int id;

	@Column(name = "TYPE_OF_REPORT", nullable = false)
	private String typeOfReport;

	@Column(name = "DATE_TIME", nullable = false)
	private String dateTime;

	@Column(name = "DETAILS", nullable = false)
	private String details;

	@Column(name = "USER_ID", nullable = false)
	private int userId;
	
	@Column(name = "USER_NAME", nullable = false)
	private String userName;
	
	@Column(name = "TITLE", nullable = false)
	private String title;
	
	@Column(name = "HANDLED_BY", nullable = false)
	private String handledBy;
	
	@Column(name = "HANDLED_BY_USERID", nullable = false)
	private int handledByUserId;

	@Column(name = "REPORTED_ID", nullable = false)
	private int reportId;

	@Column(name = "COMMENT_ID")
	private int commentId;

	@Column(name = "STATUS", nullable = false)
	private String status;

	/* Accessors and Mutators */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getHandledByUserId() {
		return handledByUserId;
	}

	public void setHandledByUserId(int handledByUserId) {
		this.handledByUserId = handledByUserId;
	}

	public String getHandledBy() {
		return handledBy;
	}

	public void setHandledBy(String handledBy) {
		this.handledBy = handledBy;
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
	 * Overriding toString Method
	 */


	@Override
	public String toString() {
		return "Handled [id=" + id + ", typeOfReport=" + typeOfReport + ", dateTime=" + dateTime + ", details="
				+ details + ", userId=" + userId + ", userName=" + userName + ", title=" + title + ", handledBy="
				+ handledBy + ", handledByUserId=" + handledByUserId + ", reportId=" + reportId + ", commentId="
				+ commentId + ", Status=" + status + "]";
	}


}
