package com.burgers.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Async
    public void sendVerificationEmail(String to, String userId) {
        String subject = "Verify Your Email - Burgers";
        String verifyUrl = frontendUrl + "/verify?code=" + userId;
        String body = """
                <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Welcome to Burgers!</h2>
                    <p>Please verify your email address by clicking the button below:</p>
                    <a href="%s" style="background-color: #FF6B35; color: white; padding: 12px 24px; 
                       text-decoration: none; border-radius: 4px; display: inline-block;">
                       Verify Email
                    </a>
                    <p style="margin-top: 20px; color: #666;">If you didn't create this account, please ignore this email.</p>
                </body>
                </html>
                """.formatted(verifyUrl);

        sendHtmlEmail(to, subject, body);
    }

    @Async
    public void sendOrderConfirmation(String to, String orderId, double amount) {
        String subject = "Order Confirmed - Burgers #" + orderId;
        String body = """
                <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Order Confirmed! 🍔</h2>
                    <p>Your order <strong>#%s</strong> has been confirmed.</p>
                    <p>Total: ₹%.2f</p>
                    <p>You can track your order status in real-time on our app.</p>
                    <p style="color: #666;">Thank you for ordering with us!</p>
                </body>
                </html>
                """.formatted(orderId, amount);

        sendHtmlEmail(to, subject, body);
    }

    private void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info("Email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send email to: {}", to, e);
        }
    }
}
