package com.studenthub.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.studenthub.entity.User;

@Service("emailService")
public class EmailService {

	@Autowired
	public JavaMailSender mailSender;

	private static String from = "studentHub";

	public void approvedUserMessage(User user) {

		// Mime message is used to send email like an HTML page
		MimeMessage mimeMessage = mailSender.createMimeMessage();

		MimeMessageHelper helper = null;

		try {

			// instantiating the helper and attaching it with mimeMessage
			helper = new MimeMessageHelper(mimeMessage, false, "utf-8");

			// set up your HTML message here
			StringBuilder htmlMsg = new StringBuilder();

			htmlMsg.append("<h1>Welcome " + user.getFirstName() + " " + user.getLastName() + "!</h1>");
			htmlMsg.append("<p>Your account has been activated!</p><br/>");
			htmlMsg.append("<p>Thanks for joining with us!</p><br/>");

			// add the HTML content to the mimeMessage

			mimeMessage.setContent(htmlMsg.toString(), "text/html");

			// set the subject and recipient of the email
			helper.setTo(user.getEmail());
			helper.setSubject("WELCOME TO StudentHub");
			helper.setFrom(from);

			// send the message
			mailSender.send(mimeMessage);

		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}
