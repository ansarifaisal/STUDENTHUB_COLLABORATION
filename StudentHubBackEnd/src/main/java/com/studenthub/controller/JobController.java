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

import com.studenthub.dao.JobDAO;
import com.studenthub.entity.Job;

@RestController
public class JobController {

	@Autowired
	Job job;

	@Autowired
	JobDAO jobDAO;

	@RequestMapping(value = "/jobs", method = RequestMethod.GET)
	public ResponseEntity<List<Job>> fetchAllJobs() {
		List<Job> jobs = jobDAO.list();
		if (jobs.isEmpty()) {
			return new ResponseEntity<List<Job>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Job>>(jobs, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/job/{id}", method = RequestMethod.GET)
	public ResponseEntity<Job> getJob(@PathVariable("id") int id) {
		job = jobDAO.getJob(id);
		if (job != null) {
			return new ResponseEntity<Job>(job, HttpStatus.OK);
		} else {
			return new ResponseEntity<Job>(HttpStatus.NOT_FOUND);
		}
	}

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

	@RequestMapping(value = "/job/createEditJob", method = RequestMethod.POST)
	public ResponseEntity<Job> createEditJob(@RequestBody Job job) {
		if (job.getId() == 0) {
			job.setStatus("PENDING");
			job.setReport("NO");
			jobDAO.addJob(job);
			return new ResponseEntity<Job>(HttpStatus.OK);
		} else {
			jobDAO.updateJob(job);
			return new ResponseEntity<Job>(HttpStatus.OK);
		}
	}

}
