package com.blossom.blossom_api.core.system;

import java.io.IOException;

public class DockerService {
    public int executeCommand(String username, String port) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("/app/Blossom/docker-dispatcher.sh", username, port);
            Process process = processBuilder.start();

            int exitCode = process.waitFor();
            return exitCode;
        } catch (IOException e) {
            System.err.println("IO Error in docker-dispatcher " + e.getMessage());
            return -1;
        } catch (InterruptedException e) {
            System.err.println("Thread interrupted while waiting for process (docker-dispatcher) " + e.getMessage());
            Thread.currentThread().interrupt();
            return -1;
        }
    }
}
