package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Report;

public interface ReportDAO {

	List<Report> list();
	
	Report getReport(int id);
	
	List<Report> getByCategory(String category);
	
	List<Report> getUnreadReportsByCat(String category);

	boolean addReport(Report report);

	boolean updateReport(Report report);

	boolean deleteReport(Report report);
}
