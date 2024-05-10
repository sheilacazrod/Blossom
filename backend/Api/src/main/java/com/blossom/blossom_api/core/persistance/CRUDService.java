package com.blossom.blossom_api.core.persistance;

import com.blossom.blossom_api.core.persistance.CRUDService;
import com.blossom.blossom_api.model.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class CRUDService {
    public String createCRUD(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("users").document(user.getUid()).set(user);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public User getCRUD(String id) throws ExecutionException, InterruptedException {
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

    public String updateCRUD(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("users").document(user.getUid()).set(user);;
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public String deleteCRUD(String id) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResultApiFuture = dbFirestore.collection("users").document(id).delete();
        return "Successfully deleted " + id;
    }

    public String startstreaming(String authToken) throws FirebaseAuthException {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authToken);

        String uid = decodedToken.getUid();

        return "El streaming ha comenzado para el usuario con UID: " + uid;
    }
}