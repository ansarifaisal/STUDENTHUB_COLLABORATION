package com.studenthub.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity(name = "EDUCATION_DETAILS")
@Component
public class EducationDetails implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Declaring Private Fields
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
	@SequenceGenerator(name = "generator", sequenceName = "EDUCATION_DETAILS_SEQ", allocationSize = 1)
	@Column(name = "ID", nullable = false)
	private int id;
	
	@OneToOne
	@JsonBackReference
	@JoinColumn(name = "USER_ID", nullable = false)
	private User user;

	@Column(name = "UNIVERSITY", nullable = false)
	private String university;

	@Column(name = "UNIVERSITY_YEAR", nullable = false)
	private int universityYear;

	@Column(name = "HIGH_SCHOOL", nullable = false)
	private String highSchool;

	@Column(name = "HIGH_SCHOOL_YEAR", nullable = false)
	private int highSchoolYear;

	/*
	 * Accessors and Mutators
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

	public String getUniversity() {
		return university;
	}

	public void setUniversity(String university) {
		this.university = university;
	}

	public int getUniversityYear() {
		return universityYear;
	}

	public void setUniversityYear(int universityYear) {
		this.universityYear = universityYear;
	}

	public String getHighSchool() {
		return highSchool;
	}

	public void setHighSchool(String highSchool) {
		this.highSchool = highSchool;
	}

	public int getHighSchoolYear() {
		return highSchoolYear;
	}

	public void setHighSchoolYear(int highSchoolYear) {
		this.highSchoolYear = highSchoolYear;
	}

	/*
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "EducationDetails [id=" + id + ", user=" + user + ", university=" + university + ", universityYear="
				+ universityYear + ", highSchool=" + highSchool + ", highSchoolYear=" + highSchoolYear + "]";
	}

}
