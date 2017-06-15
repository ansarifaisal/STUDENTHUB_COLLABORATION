package com.studenthub.testcase;

import java.time.LocalDateTime;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.JobAppliedDAO;
import com.studenthub.dao.JobDAO;
import com.studenthub.entity.Job;
import com.studenthub.entity.JobApplied;

import junit.framework.Assert;

public class JobAppliedDAOTestCases {

	@Autowired
	Job job;
	
	@Autowired
	JobDAO jobDAO;
	
	@Autowired
	JobApplied jobApplied;
	
	@Autowired
	JobAppliedDAO jobAppliedDAO;
	
	@Autowired
	AnnotationConfigApplicationContext context;
	
	public JobAppliedDAOTestCases(){
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		job = (Job) context.getBean("job");
		jobDAO = (JobDAO) context.getBean("jobDAO");
		jobApplied = (JobApplied) context.getBean("jobApplied");
		jobAppliedDAO = (JobAppliedDAO) context.getBean("jobAppliedDAO");
	}
	
/*	@Test
	public void addJobAppliedTestCase(){
		job = jobDAO.getJob(1);
		jobApplied.setAppliedDate(LocalDateTime.now());
		jobApplied.setJob(job);
		jobApplied.setUserId(1);
		jobApplied.setUserName("ansarifaisal");
		jobApplied.setStatus("PENDING");
		Assert.assertEquals(true, jobAppliedDAO.addJobApplied(jobApplied));	
	}*/
	
	@Test
	public void deleteJobAppliedTestCase(){
		jobApplied = jobAppliedDAO.getJobApplied(2);
		Assert.assertEquals(true, jobAppliedDAO.deleteJobApplied(jobApplied));
	}
}
