package com.backend.Microservice1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ApiController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${baseurl.microservice2}")
    private String microservice2BaseUrl;

    @GetMapping("/getDataFromMicroservice1")
    public ResponseEntity<?> getData(){
        String url = microservice2BaseUrl+"getDataFromMicroservice2";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return new ResponseEntity<>("THIS IS BACKEND MICROSERVICE1 RUNNING".concat("__").concat(response.getBody()), HttpStatus.OK);
        /* For docker we need to use above base url according to container name as microservice1 will be hitting microservice2
           from inside the docker container unlike ui service which hits from browser, this is for building the image and container of
           microservice 1 independently otherwise we will give all arguements of this file in enviroments of docker-compose file*/
    }


}
