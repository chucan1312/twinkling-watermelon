package com.example.backend.model;

public class Player {

    private Long id;
    private String name;
    private long coins;
    private double coinsPerSecond;
    private long lastTickTimestamp;

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

    public void setCoins(long coins) { 
        this.coins = coins; 
    }

    public void setCoinsPerSecond(double cps) { 
        this.coinsPerSecond = cps; 
    }
    
    public void setLastTickTimestamp(long ts) { 
        this.lastTickTimestamp = ts; 
    }
}
