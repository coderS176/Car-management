package com.example.carmanagement.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    private ObjectId id;
    private String car_type;
    private String company;
    private String model;
    private String year;
    private Long price;
    private String fuel_type;
    private String dealer;
    private Double mileage;
    private List<String> imageUrls = new ArrayList<>();  // List of image URLs
}
