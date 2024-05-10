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

    public List<Stream> getAllStreams() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("streams").get();
        List<Stream> streamList = new ArrayList<>();
        for (QueryDocumentSnapshot document : future.get().getDocuments()) {
            streamList.add(document.toObject(Stream.class));
        }
        return streamList;
    }

    public List<Stream> getStreamsByCategory(String category) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Query query = dbFirestore.collection("streams").whereArrayContains("categories", category);

        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

        List<Stream> streamList = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            streamList.add(document.toObject(Stream.class));
        }

        return streamList;
    }

    public Stream updateStream(Stream stream) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference streamRef = dbFirestore.collection("streams").document(stream.getStreamerId());
        Map<String, Object> updates = new HashMap<>();
        updates.put("title", stream.getTitle());
        updates.put("categories", Arrays.asList(stream.getCategories()));
        ApiFuture<WriteResult> writeResult = streamRef.update(updates);
        writeResult.get();
        return stream;
    }
}
