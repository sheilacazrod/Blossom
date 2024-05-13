package com.blossom.blossom_api.core.persistance;
import com.blossom.blossom_api.model.entity.Stream;
import com.blossom.blossom_api.model.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class StreamService {
    public UserService userService;
    public Firestore dbFirestore = FirestoreClient.getFirestore();

    public List<Stream> getAllStreams() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("streams").get();
        List<Stream> streamList = new ArrayList<>();
        for (QueryDocumentSnapshot document : future.get().getDocuments()) {
            streamList.add(document.toObject(Stream.class));
        }
        return streamList;
    }

    public Stream getStreamById(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = dbFirestore.collection("streams").document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot documentSnapshot = future.get();
        Stream stream;
        if (documentSnapshot.exists()) {
            stream = documentSnapshot.toObject(Stream.class);
            return stream;
        }
        return null;
    }

    public List<User> getStreamsByCategory(String category) throws ExecutionException, InterruptedException {
        Query query = dbFirestore.collection("streams").whereArrayContains("categories", category);

        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

        List<User> userList = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            String id= document.toObject(Stream.class).getStreamerId();
            userList.add(userService.getUserById(id));
        }

        return userList;
    }

    public Stream updateStream(Stream stream) throws InterruptedException, ExecutionException {
        DocumentReference streamRef = dbFirestore.collection("streams").document(stream.getStreamerId());
        Map<String, Object> updates = new HashMap<>();
        updates.put("title", stream.getTitle());
        updates.put("categories", stream.getCategories()); // Pasar la lista directamente
        ApiFuture<WriteResult> writeResult = streamRef.update(updates);
        writeResult.get();
        return stream;
    }
}
