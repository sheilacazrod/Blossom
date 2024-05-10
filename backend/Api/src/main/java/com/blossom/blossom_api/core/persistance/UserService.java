package com.blossom.blossom_api.core.persistance;

import com.blossom.blossom_api.model.dto.UserDTO;
import com.blossom.blossom_api.model.entity.Stream;
import com.blossom.blossom_api.model.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    public User createUser(User user) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection("users").document(user.getUserId()).set(user);
        Stream stream = new Stream(user.getUserId(), "Mi Stream", new String[]{});
        dbFirestore.collection("streams").document(user.getUserId()).set(stream);
        return user;
    }

    public User getUserById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("users").document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot documentSnapshot = future.get();
        User user;
        if (documentSnapshot.exists()) {
            user = documentSnapshot.toObject(User.class);
            return user;
        }
        return null;
    }

    public User getUserByUsername(String username) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Query query = dbFirestore.collection("users").whereEqualTo("username", username).limit(1);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        if (!documents.isEmpty()) {
            DocumentSnapshot documentSnapshot = documents.get(0);
            return documentSnapshot.toObject(User.class);
        } else {
            return null;
        }
    }

    public User updateUser(UserDTO user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("users").document(user.getUserId());
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            Map<String, Object> updates = new HashMap<>();
            updates.put("username", user.getDisplayName());
            updates.put("pictureURL", user.getPictureURL());
            updates.put("biography", user.getBiography());

            ApiFuture<WriteResult> updateFuture = docRef.set(updates, SetOptions.merge());
            updateFuture.get();
            DocumentSnapshot updatedDocument = docRef.get().get();
            return updatedDocument.toObject(User.class);
        } else {
            return null;
        }
    }

    public String deleteUser(String id) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection("users").document(id).delete();
        return "Successfully deleted " + id;
    }

    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("users").get();
        List<User> userList = new ArrayList<>();
        for (QueryDocumentSnapshot document : future.get().getDocuments()) {
            userList.add(document.toObject(User.class));
        }
        return userList;
    }

    public List<User> getFollowed(String userId) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("users").document(userId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            User user = document.toObject(User.class);
            List<String> followedIds = user.getFollowed();
            List<User> followedUsers = new ArrayList<>();
            for (String followedId : followedIds) {
                followedUsers.add(getUserById(followedId));
            }
            return followedUsers;
        } else {
            throw new IllegalArgumentException("El usuario con ID " + userId + " no existe en la base de datos.");
        }
    }

    public List<User> addFollowed(String userId, String followedId) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("users").document(userId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            User user = document.toObject(User.class);
            List<String> followedIds = new ArrayList<>(user.getFollowed());
            followedIds.add(followedId);

            Map<String, Object> updates = new HashMap<>();
            updates.put("followed", followedIds);
            docRef.set(updates, SetOptions.merge());

            return getFollowed(userId);
        } else {
            throw new IllegalArgumentException("El usuario con ID " + userId + " no existe en la base de datos.");
        }
    }

    public List<User> deleteFollowed(String userId, String followedId) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("users").document(userId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            User user = document.toObject(User.class);
            List<String> followedIds = new ArrayList<>(user.getFollowed());
            followedIds.remove(followedId);

            Map<String, Object> updates = new HashMap<>();
            updates.put("followed", followedIds);
            docRef.set(updates, SetOptions.merge());

            return getFollowed(userId);
        } else {
            throw new IllegalArgumentException("El usuario con ID " + userId + " no existe en la base de datos.");
        }
    }


    public String startStreaming(String authToken) throws FirebaseAuthException {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authToken);

        String uid = decodedToken.getUid();

        return "El streaming ha comenzado para el usuario con UID: " + uid;
    }
}
