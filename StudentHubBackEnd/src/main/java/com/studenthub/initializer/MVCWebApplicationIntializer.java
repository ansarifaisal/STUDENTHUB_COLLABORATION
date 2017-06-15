package com.studenthub.initializer;

import javax.servlet.Filter;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.studenthub.config.CORSFilter;
import com.studenthub.config.EmailConfig;
import com.studenthub.config.HibernateConfigure;
import com.studenthub.config.MvcConfig;

public class MVCWebApplicationIntializer extends AbstractAnnotationConfigDispatcherServletInitializer{

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] {HibernateConfigure.class, MvcConfig.class, EmailConfig.class};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] {};
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] {"/"};
	}
	
	@Override
	protected Filter[] getServletFilters(){
		Filter[] filter = {new CORSFilter()};
		return filter;
	}
}
