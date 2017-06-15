package com.studenthub.entity;

import javax.persistence.Transient;

import org.springframework.stereotype.Component;

/*
 * This class will take http status code and message according to the page
 * */
@Component
public class Domain {

	@Transient
	public int code;

	@Transient
	public String message;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
