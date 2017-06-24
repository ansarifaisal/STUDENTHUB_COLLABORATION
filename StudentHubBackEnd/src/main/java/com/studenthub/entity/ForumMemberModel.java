package com.studenthub.entity;

import java.io.Serializable;
import java.util.List;

public class ForumMemberModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * Declaring Private Fields
	 */

	private List<ForumMember> members;

	private List<ForumMember> admins;

	/*
	 * Accessors and Mutators OR Getters and Setters
	 */

	public List<ForumMember> getMembers() {
		return members;
	}

	public void setMembers(List<ForumMember> members) {
		this.members = members;
	}

	public List<ForumMember> getAdmins() {
		return admins;
	}

	public void setAdmins(List<ForumMember> admins) {
		this.admins = admins;
	}

	/*
	 * Overriding toString Method for Debugging
	 */

	@Override
	public String toString() {
		return "ForumMemberModel [members=" + members + ", admins=" + admins + "]";
	}

}
