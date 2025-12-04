package com.example.backend.data;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ItemData {

    // A simple map of itemName → price, temporary replacement for SQL database
    private static final Map<String, Integer> ITEM_PRICES = new HashMap<>();

    static {
        ITEM_PRICES.put("microphone", 100);
        ITEM_PRICES.put("fairylight", 150);
        ITEM_PRICES.put("poster", 50);
    }

    public static int getPrice(String itemName) {
        return ITEM_PRICES.getOrDefault(itemName, -1); 
    }
    public static Set<String> getAllItemNames() {
        return Collections.unmodifiableSet(ITEM_PRICES.keySet());
    }

    // Check if an item exists
    public static boolean isValidItem(String itemName) {
        return ITEM_PRICES.containsKey(itemName);
    }
}