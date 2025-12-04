package com.example.backend.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Player {

    private Long id;
    private String name;
    private long coins;
    private double coinsPerSecond;
    private long lastTickTimestamp;
    private Set<String> inventory = new HashSet<>();

    public Player(Long id, String name) {
        this.id = id;
        this.name = name;
        this.coins = 0;
        this.coinsPerSecond = 5.0;
        this.lastTickTimestamp = System.currentTimeMillis();
    }

    public Long getId() { 
        return id; 
    }
    
    public String getName() { 
        return name; 
    }
    
    public long getCoins() { 
        return coins; 
    }
    
    public double getCoinsPerSecond() { 
        return coinsPerSecond; 
    }
    
    public long getLastTickTimestamp() { 
        return lastTickTimestamp; 
    }

    public Set<String> getInventory() {
        return inventory;
    }

    public void setCoins(long coins) { 
        this.coins = coins; 
    }

    public void setCoinsPerSecond(double cps) { 
        this.coinsPerSecond = cps; 
    }
    
    public void setLastTickTimestamp(long ts) { 
        this.lastTickTimestamp = ts; 
    }

    public boolean hasItem(String item) {
        return inventory.contains(item);
    }

    public void addItem(String item) {
        inventory.add(item);
    }
}
