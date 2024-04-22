package com.blossom.blossom_api;

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

}
