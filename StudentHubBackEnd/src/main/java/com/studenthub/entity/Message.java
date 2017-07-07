package com.studenthub.entity;

public class Message {

	/**
	 * Declaring Private Fields
	 */

	private String message;

	private int id;

	/**
	 * Creating Constructor
	 */
	public Message() {

	}

	public Message(String message, int id) {
		super();
		this.message = message;
		this.id = id;
	}

	/**
	 * Accessors and Mutators
	 */

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	/**
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "Message [message=" + message + ", id=" + id + "]";
	}

}
