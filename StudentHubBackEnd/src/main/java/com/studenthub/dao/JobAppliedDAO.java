package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.JobApplied;

public interface JobAppliedDAO {
	
	List<JobApplied> list();
	
	JobApplied getJobApplied(int id);
	
	boolean addJobApplied(JobApplied jobApplied);
	
	boolean deleteJobApplied(JobApplied jobApplied);
	
}
