package com.studenthub.dao;

import java.util.List;

import com.studenthub.entity.Handled;

public interface HandledDAO {

	List<Handled> list();

	Handled getHandle(int id);

	List<Handled> getByCategory(String category);

	boolean addHandle(Handled handle);

	boolean updateHandle(Handled handle);

	boolean deleteHandle(Handled handle);

}
