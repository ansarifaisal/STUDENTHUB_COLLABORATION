package com.studenthub.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity(name = "EVENTS")
@Component
public class Event implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring private fields
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "EVENTS_SEQ", allocationSize = 1)
	@Column(name = "EVENT_ID", nullable = false)
	private int id;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "NAME", nullable = false)
	private String eventTitle;

	@Column(name = "IMAGE_URL", nullable = false)
	private String imageURL;

	@Column(name = "VENUE", nullable = false)
	private String venue;

	@Column(name = "DESCRIPTION", nullable = false)
	private String description;

	@Column(name = "START_DATE", nullable = false)
	private String startDate;

	@Column(name = "END_DATE", nullable = false)
	private String endDate;

	@Column(name = "POST_DATE", nullable = false)
	private String postDate;

	@Column(name = "NO_OF_APPLIED", nullable = false)
	private int noOfApplied;

	@Column(name = "REPORTED", nullable = false)
	private String reported;

	@Column(name = "EVENT_STATUS", nullable = false)
	private String eventStatus;

	@Column(name = "STATUS", nullable = false)
	private String status;

	@OneToMany(mappedBy = "event")
	@JsonManagedReference
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<EventJoined> eventJoined;

	/*
	 * Getter and Setters
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

	public String getEventTitle() {
		return eventTitle;
	}

	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getVenue() {
		return venue;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getPostDate() {
		return postDate;
	}

	public void setPostDate(String postDate) {
		this.postDate = postDate;
	}

	public int getNoOfApplied() {
		return noOfApplied;
	}

	public void setNoOfApplied(int noOfApplied) {
		this.noOfApplied = noOfApplied;
	}

	public String getReported() {
		return reported;
	}

	public void setReported(String reported) {
		this.reported = reported;
	}

	public String getEventStatus() {
		return eventStatus;
	}

	public void setEventStatus(String eventStatus) {
		this.eventStatus = eventStatus;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<EventJoined> getEventJoined() {
		return eventJoined;
	}

	public void setEventJoined(List<EventJoined> eventJoined) {
		this.eventJoined = eventJoined;
	}

	/*
	 * Overriding toString method for debugging
	 */

	@Override
	public String toString() {
		return "Event [id=" + id + ", userId=" + userId + ", userName=" + userName + ", eventTitle=" + eventTitle
				+ ", imageURL=" + imageURL + ", venue=" + venue + ", description=" + description + ", startDate="
				+ startDate + ", endDate=" + endDate + ", postDate=" + postDate + ", noOfApplied=" + noOfApplied
				+ ", reported=" + reported + ", eventStatus=" + eventStatus + ", status=" + status + ", eventJoined="
				+ eventJoined + "]";
	}

}
