package com.openclassrooms.chatback.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/sendMessage")
    public void handleUserMessage(Map<String, String> payload) {
        String userEmail = payload.get("userEmail");
        String message = payload.get("message");

        messagingTemplate.convertAndSend("/topic/support", Map.of("userEmail", userEmail, "message", message, "from", "user"));
        messagingTemplate.convertAndSend("/topic/user/" + userEmail, Map.of("message", message, "from", "user"));
    }
    @PreAuthorize("hasRole('SUPPORT')")
    @MessageMapping("/sendSupportMessage")
    public void handleSupportMessage(Map<String, String> payload) {
        String userEmail = payload.get("userEmail");
        String message = payload.get("message");

        messagingTemplate.convertAndSend("/topic/user/" + userEmail, Map.of("message", message, "from", "support"));

        messagingTemplate.convertAndSend("/topic/support", Map.of("userEmail", userEmail, "message", message, "from", "support"));
    }
}

