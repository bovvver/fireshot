package com.github.fireshot.utils;

public class Utility {

    public static long convertMinutesToMilliseconds(long minutes) {
        return minutes * 60 * 1000;
    }

    public static long convertDaysToMinutes(long days){
        return days * 24 * 60;
    }
}
