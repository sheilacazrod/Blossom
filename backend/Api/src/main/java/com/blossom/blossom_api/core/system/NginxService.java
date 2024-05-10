package com.blossom.blossom_api.core.system;

import java.io.IOException;

public class NginxService {
    public static int executeCommand(String username) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("/app/Blossom/user-dynamic-config.sh", username);
            Process process = processBuilder.start();

            return process.waitFor();
        } catch (IOException e) {
            System.err.println("IO Error in user-dynamic-config " + e.getMessage());
            return -1;
        } catch (InterruptedException e) {
            System.err.println("Thread interrupted while waiting for process (user-dynamic-config) " + e.getMessage());
            Thread.currentThread().interrupt();
            return -1;
        }
    }
}
