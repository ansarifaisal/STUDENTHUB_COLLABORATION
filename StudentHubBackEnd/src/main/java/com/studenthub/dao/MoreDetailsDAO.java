package com.studenthub.dao;

import com.studenthub.entity.MoreDetails;

public interface MoreDetailsDAO {

	MoreDetails get(int id);

	boolean add(MoreDetails moreDetails);

	boolean update(MoreDetails moreDetails);

	boolean delete(MoreDetails moreDetails);

}
