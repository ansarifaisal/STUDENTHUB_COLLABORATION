package com.studenthub.testcase;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.JobDAO;
import com.studenthub.entity.Job;

import junit.framework.Assert;

public class JobDAOTestCases {

	@Autowired
	Job job;
	
	@Autowired
	JobDAO jobDAO;
	
	@Autowired
	AnnotationConfigApplicationContext context;
	
	public JobDAOTestCases(){
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		job = (Job) context.getBean("job");
		jobDAO = (JobDAO) context.getBean("jobDAO");
	}
	
	@Test
	public void addJobTestCase(){
		job.setTitle("Test");
		job.setCompany("Global Service");
		job.setExperience(4);
		job.setDescription("This is a test");
		job.setUserId(2);
		job.setUserName("ansarifaisal");
		job.setQualification("HSC");
		job.setPostDate("26-01-1995");
		job.setQualification("HSC");
		job.setSalary(100000);
		job.setKeySkills("JAVA, ANGULAR");
		job.setLocation("Mumbai");
		job.setReport("NO");
		job.setStatus("PENDING");
		jobDAO.addJob(job);
	}
	
	/*@Test
	public void updateJobTestCase(){
		job = jobDAO.getForum(1);
		job.setDescription("testtest");
		Assert.assertEquals(true, jobDAO.updateJob(job));
	}*/
	
	/*@Test
	public void deleteJobTestCase(){
		job = jobDAO.getJob(1);	
		Assert.assertEquals(true, jobDAO.deleteJob(job));
	}*/
}
