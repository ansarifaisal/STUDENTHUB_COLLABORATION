package com.studenthub.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Transient;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity(name = "USERS")
@Component
public class User extends Domain implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "USERS_SEQ", allocationSize = 1)
	@Column(name = "USER_ID", nullable = false)
	private int id;

	@Column(name = "EMAIL", nullable = false)
	private String email;

	@Column(name = "USERNAME", nullable = false)
	private String userName;

	@Column(name = "PASSWORD", nullable = false)
	private String password;

	@Transient
	private String confirmPassword;

	@Column(name = "FIRST_NAME", nullable = false)
	private String firstName;

	@Column(name = "LAST_NAME", nullable = false)
	private String lastName;

	@Column(name = "GENDER", nullable = false)
	private String gender;

	@Column(name = "DOB", nullable = false)
	private String dob;

	@Column(name = "DOJ", nullable = false)
	private String doj;

	@Column(name = "PROFILE_IMAGE", nullable = false)
	private String profilePicture;

	@Column(name = "NO_OF_BLOGS", nullable = false)
	private int noOfBlogs;

	@Column(name = "NO_OF_FORUMS", nullable = false)
	private int noOfForums;

	@Column(name = "NO_OF_JOBS", nullable = false)
	private int noOfJobs;

	@Column(name = "NO_OF_EVENTS", nullable = false)
	private int noOfEvents;

	@Column(name = "NO_OF_FRIENDS", nullable = false)
	private int noOfFriends;

	@Column(name = "ISONLINE", nullable = false)
	private String isOnline;

	@Column(name = "ROLE", nullable = false)
	private String role;

	@Column(name = "STATUS", nullable = false)
	private String status;

	@OneToOne(mappedBy = "user")
	@JsonManagedReference
	private MoreDetails moreDetails;

	@OneToOne(mappedBy = "user")
	@JsonManagedReference
	private EducationDetails educationDetails;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	@JsonManagedReference
	private List<SocialLinks> socialLinks;

	/*
	 * Getters and Setters OR Accessors and Muttators
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public MoreDetails getMoreDetails() {
		return moreDetails;
	}

	public void setMoreDetails(MoreDetails moreDetails) {
		this.moreDetails = moreDetails;
	}

	public EducationDetails getEducationDetails() {
		return educationDetails;
	}

	public void setEducationDetails(EducationDetails educationDetails) {
		this.educationDetails = educationDetails;
	}

	public List<SocialLinks> getSocialLinks() {
		return socialLinks;
	}

	public void setSocialLinks(List<SocialLinks> socialLinks) {
		this.socialLinks = socialLinks;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getDoj() {
		return doj;
	}

	public void setDoj(String doj) {
		this.doj = doj;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public int getNoOfBlogs() {
		return noOfBlogs;
	}

	public void setNoOfBlogs(int noOfBlogs) {
		this.noOfBlogs = noOfBlogs;
	}

	public int getNoOfForums() {
		return noOfForums;
	}

	public void setNoOfForums(int noOfForums) {
		this.noOfForums = noOfForums;
	}

	public int getNoOfJobs() {
		return noOfJobs;
	}

	public void setNoOfJobs(int noOfJobs) {
		this.noOfJobs = noOfJobs;
	}

	public int getNoOfEvents() {
		return noOfEvents;
	}

	public void setNoOfEvents(int noOfEvents) {
		this.noOfEvents = noOfEvents;
	}

	public int getNoOfFriends() {
		return noOfFriends;
	}

	public void setNoOfFriends(int noOfFriends) {
		this.noOfFriends = noOfFriends;
	}

	public String getIsOnline() {
		return isOnline;
	}

	public void setIsOnline(String isOnline) {
		this.isOnline = isOnline;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	/* Overriding toString Method For Debugging */

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", userName=" + userName + ", password=" + password
				+ ", confirmPassword=" + confirmPassword + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", gender=" + gender + ", dob=" + dob + ", doj=" + doj + ", profilePicture=" + profilePicture
				+ ", noOfBlogs=" + noOfBlogs + ", noOfForums=" + noOfForums + ", noOfJobs=" + noOfJobs + ", noOfEvents="
				+ noOfEvents + ", noOfFriends=" + noOfFriends + ", isOnline=" + isOnline + ", role=" + role
				+ ", status=" + status + ", moreDetails=" + moreDetails + ", educationDetails=" + educationDetails
				+ ", socialLinks=" + socialLinks + "]";
	}

}
