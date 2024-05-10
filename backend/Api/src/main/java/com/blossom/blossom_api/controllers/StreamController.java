package com.blossom.blossom_api.controllers;
import com.blossom.blossom_api.core.persistance.StreamService;
import com.blossom.blossom_api.model.dto.UserDTO;
import com.blossom.blossom_api.model.entity.Stream;
import com.blossom.blossom_api.model.entity.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StreamController {
    public StreamService streamService;
    public StreamController(StreamService streamService) {this.streamService = streamService;}

    @GetMapping("/getAllStreams")
    public List<Stream> getAllStreams() throws ExecutionException, InterruptedException {
        return streamService.getAllStreams();
    }
    @GetMapping("/getStreamsByCategory")
    public List<Stream> getStreamsByCategory(@RequestParam String category) throws ExecutionException, InterruptedException {
        return streamService.getStreamsByCategory(category);
    }

    @PutMapping("/updateStream")
    public Stream updateUser(@RequestBody Stream stream) throws Exception {
        return streamService.updateStream(stream);
    }
}
