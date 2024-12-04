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

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private ObjectId id;
    private String email;
    @NonNull
    private String userName;
    @NonNull
    private String fName;
    private String lName;
    @NonNull
    private String password;
    private List<Car>carList = new ArrayList<>();
}
