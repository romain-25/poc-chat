package com.openclassrooms.chatback.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.util.concurrent.ConcurrentHashMap;

import java.util.Map;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/sendMessage")
    public void handleUserMessage(Map<String, String> payload) {
        String userId = payload.get("userId");
        String message = payload.get("message");

        messagingTemplate.convertAndSend("/topic/support", Map.of("userId", userId, "message", message, "from", "user"));
        messagingTemplate.convertAndSend("/topic/user/" + userId, Map.of("message", message, "from", "user"));
    }

    @MessageMapping("/sendSupportMessage")
    public void handleSupportMessage(Map<String, String> payload) {
        String userId = payload.get("userId");
        String message = payload.get("message");

        messagingTemplate.convertAndSend("/topic/user/" + userId, Map.of("message", message, "from", "support"));

        messagingTemplate.convertAndSend("/topic/support", Map.of("userId", userId, "message", message, "from", "support"));
    }
}

