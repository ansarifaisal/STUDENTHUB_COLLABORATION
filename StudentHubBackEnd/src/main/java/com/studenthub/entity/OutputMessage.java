package com.studenthub.entity;

import java.util.Date;

public class OutputMessage extends Message {

	/**
	 * Declaring Private Fields
	 */

	private Date time;

	/**
	 * Creating Constructor
	 */
	public OutputMessage(Message original, Date time) {
		super(original.getMessage(), original.getId());
		this.time = time;
	}

	/**
	 * Accessors And Mutatorss
	 */

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	/*
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "OutputMessage [time=" + time + "]";
	}

}
