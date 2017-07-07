package com.studenthub.initializer;

import java.io.File;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.studenthub.config.CORSFilter;
import com.studenthub.config.EmailConfig;
import com.studenthub.config.HibernateConfigure;
import com.studenthub.config.MvcConfig;
import com.studenthub.config.WebSocketConfig;

public class MVCWebApplicationIntializer extends AbstractAnnotationConfigDispatcherServletInitializer{
	
	private int maxUploadSizeInMb = 5 * 1024 * 1024; // 5 MB
	
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] {HibernateConfigure.class, MvcConfig.class, EmailConfig.class, WebSocketConfig.class};
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
	
	@Override
	protected void customizeRegistration(Dynamic registration) {
		 // upload temp file will put here
        File uploadDirectory = new File(System.getProperty("java.io.tmpdir"));

        // register a MultipartConfigElement
        MultipartConfigElement multipartConfigElement =
                new MultipartConfigElement(uploadDirectory.getAbsolutePath(),
                        maxUploadSizeInMb, maxUploadSizeInMb * 2, maxUploadSizeInMb / 2);
				
		registration.setMultipartConfig(multipartConfigElement);
		super.customizeRegistration(registration);
	}
}
