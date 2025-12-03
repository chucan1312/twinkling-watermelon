package com.example.backend.service;

import com.example.backend.model.Player;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PlayerService {

    // In-memory data store (temporary until you use PostgreSQL)
    private final Map<Long, Player> players = new HashMap<>();

    // Simple ID generator
    private long nextId = 1;

    // Create a new player
    public Player createPlayer(String name) {
        Player p = new Player(nextId++, name);
        players.put(p.getId(), p);
        return p;
    }

    // Get an existing player by ID
    public Player getPlayer(Long id) {
        return players.get(id);
    }

    // Tick the player's coins based on elapsed time
    public Player tick(Long id) {
        Player p = players.get(id);
        if (p == null) return null;

        long now = System.currentTimeMillis();
        long elapsedMillis = now - p.getLastTickTimestamp();
        double elapsedSeconds = elapsedMillis / 1000.0;

        long earned = (long) (elapsedSeconds * p.getCoinsPerSecond());
        p.setCoins(p.getCoins() + earned);
        p.setLastTickTimestamp(now);

        return p;
    }
}
