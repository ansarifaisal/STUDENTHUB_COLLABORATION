package com.studenthub.entity;

public class Message {

	/**
	 * Declaring Private Fields
	 */

	private String message;

	private int id;

	private String senderUserName;

	private String receiverUserName;

	/**
	 * Creating Constructor
	 */
	public Message() {

	}

	public Message(String message, int id, String senderUserName, String receiverUserName) {
		super();
		this.message = message;
		this.id = id;
		this.senderUserName = senderUserName;
		this.receiverUserName = receiverUserName;
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

	public String getSenderUserName() {
		return senderUserName;
	}

	public void setSenderUserName(String senderUserName) {
		this.senderUserName = senderUserName;
	}

	public String getReceiverUserName() {
		return receiverUserName;
	}

	public void setReceiverUserName(String receiverUserName) {
		this.receiverUserName = receiverUserName;
	}

	/**
	 * Overriding toString Method For Debugging
	 */

	@Override
	public String toString() {
		return "Message [message=" + message + ", id=" + id + ", senderuserName=" + senderUserName
				+ ", ReceiverUserName=" + receiverUserName + "]";
	}

}
