package com.studenthub.testcase;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.studenthub.dao.ForumDAO;
import com.studenthub.dao.TopicDAO;
import com.studenthub.entity.Forum;
import com.studenthub.entity.Topic;

public class TopicDAOTestCases {

	@Autowired
	Forum forum;
	
	@Autowired
	ForumDAO forumDAO;
	
	@Autowired
	Topic topic;
	
	@Autowired
	TopicDAO topicDAO;
	
	@Autowired
	AnnotationConfigApplicationContext context;
	
	public TopicDAOTestCases(){
		
		context = new AnnotationConfigApplicationContext();
		context.scan("com.studenthub");
		context.refresh();
		forum = (Forum) context.getBean("forum");
		forumDAO = (ForumDAO) context.getBean("forumDAO");
		topic = (Topic) context.getBean("topic");
		topicDAO = (TopicDAO) context.getBean("topicDAO");
		
	}
	
//	@Test
//	public void addTopicTestCase(){
//		forum = forumDAO.getForum(3);
//		topic.setUserId(1);
//		topic.setUserName("ansarifaisal");
//		topic.setForum(forum);
//		topic.setTitle("Test");
//		topic.setImageURL("noPic.jpg");
//		topic.setDescription("This is a test, This is a test");
//		topic.setCreatedDate("26-01-1995");
//		topic.setReport("NO");
//		topic.setStatus("OPEN");
//		topicDAO.addTopic(topic);
//	}
	
	/*public void updateTopicTestCase(){
		topic = topicDAO.getTopic(3);
		topic.setCreatedDate(LocalDateTime.now());
		topicDAO.updateTopic(topic);
	}*/
	
/*	@Test
	public void deleteTopicTestCase(){
		topic = topicDAO.getTopic(3);
		Assert.assertEquals(true, topicDAO.deleteTopic(topic));
	}*/
	
}
