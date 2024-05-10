package com.blossom.blossom_api.core.persistance;

import com.blossom.blossom_api.PortManager;
import com.blossom.blossom_api.model.entity.User;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class FirebaseService {

    public void saveUserToFirestore(User user) {
        Map<String, Object> userData = new HashMap<>();
        userData.put("Uid", user.getUid());
        userData.put("username", user.getUsername());
        userData.put("streamUrl", user.generateStreamUrl(generateRandomPort()));
        userData.put("streamPassword", user.generateStreamPassword());

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("users").document(user.getUid());
        docRef.set(userData);
    }

    private int generateRandomPort() {
        return PortManager.generateRandomPort();
    }
}
