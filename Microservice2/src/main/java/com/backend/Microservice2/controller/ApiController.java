package com.backend.Microservice2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @GetMapping("/getDataFromMicroservice2")
    public ResponseEntity<?> getData(){
        return new ResponseEntity<>("THIS IS BACKEND MICROSERVICE2 RUNNING", HttpStatus.OK);
    }
}
