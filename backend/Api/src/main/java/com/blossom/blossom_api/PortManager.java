package com.blossom.blossom_api;

import java.io.*;

public class PortManager {
    private static final String PORT_FILE_PATH = "src/main/resources/used_ports.txt";

    public static int generateRandomPort() {
        int lastPort = getLastUsedPort();
        int newPort = lastPort + 1;
        savePort(newPort);
        return newPort;
    }

    private static int getLastUsedPort() {
        int lastPort = 1934;
        try {
            File file = new File(PORT_FILE_PATH);
            if (file.exists()) {
                BufferedReader reader = new BufferedReader(new FileReader(file));
                String lastPortStr = reader.readLine();
                if (lastPortStr != null && !lastPortStr.isEmpty()) {
                    lastPort = Integer.parseInt(lastPortStr);
                }
                reader.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lastPort;
    }

    private static void savePort(int port) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(PORT_FILE_PATH));
            writer.write(String.valueOf(port));
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}