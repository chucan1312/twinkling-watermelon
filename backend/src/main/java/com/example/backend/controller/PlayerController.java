package com.example.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Player;
import com.example.backend.service.PlayerService;

@RestController
@RequestMapping("/api/player")
@CrossOrigin(origins = "http://localhost:5173")


public class PlayerController {
    private final PlayerService playerService;  

    public PlayerController(PlayerService playerService) {  
        this.playerService = playerService;
    }

    @PostMapping("/init")
    public Player initPlayer(@RequestParam String name) {
        return playerService.createPlayer(name);
    }

    @GetMapping("/{id}")
    public Player getPlayerById(@PathVariable Long id) {
        return playerService.getPlayer(id);
    }

    @PostMapping("/{id}/tick")
    public Player tickPlayer(@PathVariable Long id) {
        return playerService.tick(id);
    }

    @PostMapping("/{id}/purchase/{item}")
    public Player purchasePlayer(@PathVariable Long id, @PathVariable String item) {
        return playerService.purchase(id, item);
    }
}
