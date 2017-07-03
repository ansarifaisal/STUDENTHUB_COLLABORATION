package com.studenthub.dao;

import com.studenthub.entity.SocialLinks;

public interface SocialLinksDAO {

	SocialLinks get(int id);

	boolean add(SocialLinks socialLinks);

	boolean update(SocialLinks socialLinks);

	boolean delete(SocialLinks socialLinks);
	
}
