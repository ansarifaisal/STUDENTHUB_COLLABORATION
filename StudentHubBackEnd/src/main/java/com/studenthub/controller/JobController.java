package com.studenthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studenthub.dao.JobAppliedDAO;
import com.studenthub.dao.JobDAO;
import com.studenthub.entity.Job;
import com.studenthub.entity.JobApplied;

@RestController
public class JobController {

	@Autowired
	Job job;

	@Autowired
	JobDAO jobDAO;

	@Autowired
	JobApplied jobApplied;

	@Autowired
	JobAppliedDAO jobAppliedDAO;

	// <!---------------Get all jobs--------------------------!>
	@RequestMapping(value = "/jobs", method = RequestMethod.GET)
	public ResponseEntity<List<Job>> fetchAllJobs() {
		List<Job> jobs = jobDAO.list();
		if (jobs.isEmpty()) {
			return new ResponseEntity<List<Job>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Job>>(jobs, HttpStatus.OK);
		}
	}

	// <!--------------------------Get Job-------------------------!>
	@RequestMapping(value = "/job/{id}", method = RequestMethod.GET)
	public ResponseEntity<Job> getJob(@PathVariable("id") int id) {
		job = jobDAO.getJob(id);
		if (job != null) {
			return new ResponseEntity<Job>(job, HttpStatus.OK);
		} else {
			return new ResponseEntity<Job>(HttpStatus.NOT_FOUND);
		}
	}

	// <!-----------------------Perform Action--------------------------!>
	@RequestMapping(value = "/admin/job/{action}/{id}", method = RequestMethod.GET)
	public ResponseEntity<Job> validateJob(@PathVariable("action") String action, @PathVariable("id") int id) {
		job = jobDAO.getJob(id);
		if (job != null) {
			switch (action) {
			case "Approved":
				job.setStatus("APPROVED");
				break;
			case "Rejected":
				job.setStatus("REJECTED");
				break;
			case "Closed":
				job.setStatus("CLOSED");
				break;
			}
			boolean flag = jobDAO.updateJob(job);
			if (flag != false) {
				return new ResponseEntity<Job>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Job>(HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Job>(HttpStatus.NO_CONTENT);
		}
	}

	// <!---------------------------Validate All Jobs-------------------------!>
	@RequestMapping(value = "/admin/validatealljobs", method = RequestMethod.GET)
	public ResponseEntity<List<Job>> validateAllJobs() {
		List<Job> pendingJobs = jobDAO.listAllPendingJobs();
		if (pendingJobs.isEmpty()) {
			return new ResponseEntity<List<Job>>(HttpStatus.NO_CONTENT);
		} else {
			for (Job pendingJob : pendingJobs) {
				pendingJob.setStatus("APPROVED");
				jobDAO.updateJob(pendingJob);
			}
			return new ResponseEntity<List<Job>>(HttpStatus.OK);
		}
	}

	// <!---------------------Create Edit Job------------------------!>
	@RequestMapping(value = "/job/createEditJob", method = RequestMethod.POST)
	public ResponseEntity<Job> createEditJob(@RequestBody Job job) {
		if (job.getId() == 0) {
			jobDAO.addJob(job);
			return new ResponseEntity<Job>(HttpStatus.OK);
		} else {
			jobDAO.updateJob(job);
			return new ResponseEntity<Job>(HttpStatus.OK);
		}
	}

	// <!-----------------Get Applied Job------------------------->

	@RequestMapping(value = "job/{id}/appliedJobs", method = RequestMethod.GET)
	public ResponseEntity<List<JobApplied>> getAppliedJob(@PathVariable("id") int id) {
		List<JobApplied> appliedJobs = jobAppliedDAO.list(id);
		if (appliedJobs.isEmpty()) {
			return new ResponseEntity<List<JobApplied>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<JobApplied>>(appliedJobs, HttpStatus.OK);

		}
	}

	// <!------------------Apply Job------------------------------>

	@RequestMapping(value = "/job/apply", method = RequestMethod.POST)
	public ResponseEntity<JobApplied> applyJob(@RequestBody JobApplied jobApplied) {
		boolean flag = jobAppliedDAO.addJobApplied(jobApplied);
		if (flag != false) {
			List<JobApplied> list = jobAppliedDAO.list(jobApplied.getJob().getId());
			jobApplied.getJob().setNoOfApplied(list.size());
			jobDAO.updateJob(jobApplied.getJob());
			return new ResponseEntity<JobApplied>(HttpStatus.OK);
		} else {
			return new ResponseEntity<JobApplied>(HttpStatus.NO_CONTENT);
		}
	}

	// <!----------------Delete Applied Job------------------------->

	@RequestMapping(value = "/job/delAppliedJob/{id}", method = RequestMethod.GET)
	public ResponseEntity<JobApplied> delApplyJob(@PathVariable("id") int id) {
		jobApplied = jobAppliedDAO.getJobApplied(id);
		job = jobApplied.getJob();
		if (jobApplied != null) {
			boolean flag = jobAppliedDAO.deleteJobApplied(jobApplied);
			if (flag != false) {
				int noOfApplied = jobAppliedDAO.list(job.getId()).size();
				job.setNoOfApplied(noOfApplied);
				jobDAO.updateJob(job);
				return new ResponseEntity<JobApplied>(HttpStatus.OK);
			} else {
				return new ResponseEntity<JobApplied>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<JobApplied>(HttpStatus.NOT_FOUND);
		}
	}

	// <!----------------------Created Job List---------------------------!>

	@RequestMapping(value = "/job/jobCreatedList/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Job>> createdJobList(@PathVariable("id") int id) {

		List<Job> jobs = jobDAO.getCreatedJobs(id);
		if (jobs.isEmpty()) {
			return new ResponseEntity<List<Job>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Job>>(jobs, HttpStatus.OK);
		}

	}

	// <!---------------------Disable Job--------------------->
	
	

}
