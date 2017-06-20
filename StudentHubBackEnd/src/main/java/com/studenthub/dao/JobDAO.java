package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Job;

public interface JobDAO {

	Job getJob(int id);

	List<Job> list();

	List<Job> getCreatedJobs(int userID);

	List<Job> getLatestJobs();

	List<Job> listAllPendingJobs();
	
	List<Job> createdJobList(int userID);

	boolean addJob(Job job);

	boolean updateJob(Job job);

	boolean deleteJob(Job job);

}
