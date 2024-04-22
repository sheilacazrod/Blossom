package com.blossom.blossom_api;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CRUDController {
    public CRUDService crudService;

    public CRUDController(CRUDService crudService) {
        this.crudService = crudService;
    }

    @PostMapping("/create")
    public String createCRUD(@RequestBody User user) throws Exception {
        return crudService.createCRUD(user);
    }

    @GetMapping("/get")
    public User getCRUD(@RequestParam String id) throws Exception {
        return crudService.getCRUD(id);
    }

    @PutMapping("/update")
    public String updateCRUD(@RequestBody User user) throws Exception {
        return crudService.updateCRUD(user);
    }

    @DeleteMapping("/delete")
    public String deleteCRUD(@RequestParam String id) throws Exception {
        return crudService.deleteCRUD(id);
    }

    @PostMapping("/startstreaming")
    public String startStreaming(@RequestParam("authToken") String authToken) {
        try {
            // Llama al método startstreaming del servicio CRUDService
            return crudService.startstreaming(authToken);
        } catch (FirebaseAuthException e) {
            // Maneja cualquier excepción que pueda ocurrir al verificar el token
            return "Error al iniciar streaming: " + e.getMessage();
        }
    }
}
