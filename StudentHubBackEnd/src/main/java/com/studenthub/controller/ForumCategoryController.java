package com.studenthub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.studenthub.dao.ForumCategoryDAO;
import com.studenthub.entity.ForumCategory;

@Controller
@RequestMapping(value = { "/forumcategory" })
public class ForumCategoryController {

	@Autowired
	ForumCategoryDAO forumCategoryDAO;

	@Autowired
	ForumCategory forumCategory;

	@RequestMapping(value = { "/create" }, method = RequestMethod.POST)
	public ResponseEntity<Void> createForumCategory(@RequestBody ForumCategory forumCategory) {
		
		boolean flag = forumCategoryDAO.findByName(forumCategory.getName());
		
		if(flag != true){
		
		forumCategory.setStatus("PENDING");
		forumCategoryDAO.addForumCategory(forumCategory);
		forumCategory.setCode(200);
		forumCategory.setMessage("Category Added Successfully!");
		return new ResponseEntity<Void>(HttpStatus.OK);
		}else{
			forumCategory.setCode(302);
			forumCategory.setMessage("Name Already Exists");
			return new ResponseEntity<Void>(HttpStatus.FOUND);
		}
	}

	@RequestMapping(value = { "/edit" }, method = RequestMethod.POST)
	public ResponseEntity<Void> editForumCategory(@RequestBody ForumCategory forumCategory) {
		forumCategoryDAO.updateForumCategory(forumCategory);
		forumCategory.setCode(200);
		forumCategory.setMessage("Category Updated Successfully!");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = { "/delete" }, method = RequestMethod.POST)
	public ResponseEntity<Void> deleteForumCategory(@RequestBody ForumCategory forumCategory) {
		forumCategoryDAO.deleteForumCategory(forumCategory);
		forumCategory.setCode(200);
		forumCategory.setMessage("Category Deleted Successfully!");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = { "/get/{id}" }, method = RequestMethod.POST)
	public ResponseEntity<ForumCategory> getForumCategory(@RequestBody int id) {
		ForumCategory forumCategory = forumCategoryDAO.getForumCategory(id);
		forumCategory.setCode(200);
		return new ResponseEntity<ForumCategory>(forumCategory, HttpStatus.OK);
	}

	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
	public ResponseEntity<List<ForumCategory>> getAllCategory() {
		List<ForumCategory> forumCategories = forumCategoryDAO.list();
		forumCategory.setCode(200);
		return new ResponseEntity<List<ForumCategory>>(forumCategories, HttpStatus.OK);
	}

	@RequestMapping(value = { "/checkExistingCategory" }, method = RequestMethod.POST)
	public ResponseEntity<Void> checkExistingCategory(@RequestBody String forumCategoryName) {

		boolean flag = forumCategoryDAO.findByName(forumCategoryName);
		if (flag != true) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Void>(HttpStatus.FOUND);
		}
	}

}
