package com.blossom.blossom_api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CRUDController {
    public CRUDService crudService;

    public CRUDController(CRUDService crudService) {
        this.crudService = crudService;
    }

    @PostMapping("/create")
    public String createCRUD(@RequestBody CRUD crud) throws Exception {
        return crudService.createCRUD(crud);
    }

    @GetMapping("/get")
    public CRUD getCRUD(@RequestParam String id) throws Exception {
        return crudService.getCRUD(id);
    }

    @PutMapping("/update")
    public String updateCRUD(@RequestBody CRUD crud) throws Exception {
        return crudService.updateCRUD(crud);
    }

    @DeleteMapping("/delete")
    public String deleteCRUD(@RequestParam String id) throws Exception {
        return crudService.deleteCRUD(id);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testCRUD(){return ResponseEntity.ok("Hello World");}
}
