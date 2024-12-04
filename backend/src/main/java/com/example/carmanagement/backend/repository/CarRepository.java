package com.example.carmanagement.backend.repository;

import com.example.carmanagement.backend.entity.Car;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CarRepository extends MongoRepository<Car, ObjectId> {
    @Query("{'$text': {'$search': ?0}}")
    List<Car> findByKeyword(String keyword);
}
