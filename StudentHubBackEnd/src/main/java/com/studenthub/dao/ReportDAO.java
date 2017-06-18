package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Report;

public interface ReportDAO {

	List<Report> list();
	
	Report getReport(int id);

	boolean addReport(Report report);

	boolean updateReport(Report report);

	boolean deleteReport(Report report);
}
