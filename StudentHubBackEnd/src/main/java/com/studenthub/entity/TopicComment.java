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

@Entity(name = "TOPIC_COMMENTS")
@Component
public class TopicComment extends Domain implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "TOPIC_COMMENT_SEQ", allocationSize = 1)
	@Column(name = "TOPIC_COMMENT_ID", nullable = false)
	private int id;

	@ManyToOne
	@JoinColumn(name = "TOPIC_ID", nullable = false)
	private Topic topic;

	@Column(name = "USER_ID", nullable = false)
	private int userId;

	@Column(name = "USER_NAME", nullable = false)
	private String userName;

	@Column(name = "TOPIC_COMMENT", nullable = false)
	private String topicComment;

	@Column(name = "COMMENT_DATE", nullable = false)
	private String commentDate;

	@Column(name = "NO_OF_LIKES", nullable = false)
	private int noOfLikes;

	@Column(name = "REPORT", nullable = false)
	private String report;

	/*
	 * Accessors and Mutators
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

	public String getTopicComment() {
		return topicComment;
	}

	public void setTopicComment(String topicComment) {
		this.topicComment = topicComment;
	}

	public String getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(String commentDate) {
		this.commentDate = commentDate;
	}

	public int getNoOfLikes() {
		return noOfLikes;
	}

	public void setNoOfLikes(int noOfLikes) {
		this.noOfLikes = noOfLikes;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}

	/**
	 * Overriding toString method for debugging
	 */

	@Override
	public String toString() {
		return "TopicComment [id=" + id + ", topic=" + topic + ", userId=" + userId + ", userName=" + userName
				+ ", topicComment=" + topicComment + ", commentDate=" + commentDate + ", noOfLikes=" + noOfLikes
				+ ", report=" + report + "]";
	}

}
