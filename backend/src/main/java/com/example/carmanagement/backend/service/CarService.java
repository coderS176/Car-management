package com.example.carmanagement.backend.service;

import com.example.carmanagement.backend.entity.Car;
import com.example.carmanagement.backend.entity.User;
import com.example.carmanagement.backend.repository.CarRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserService userService;

    // Add Car
    public Car saveCar(Car car, String userName){
        User user = userService.findByUserName(userName);
        Car saved = carRepository.save(car);
        user.getCarList().add(saved);
        userService.saveUser(user);
        return carRepository.save(car);
    }

    public Car saveCar(Car car){
        return carRepository.save(car);
    }

    // Get all cars
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Get a car by its id
    public Optional<Car> getCarById(ObjectId id) {
        return carRepository.findById(id);
    }

    // Search by keyword
    public List<Car> searchCars(String keyword) {
        // Perform the text search query for title, description, and tags
        return carRepository.findByKeyword(keyword);
    }

    // Update a car by its id
    public Car updateCar(ObjectId id, Car updatedCar) {
        Optional<Car> existingCar = carRepository.findById(id);
        if (existingCar.isPresent()) {
            Car car = existingCar.get();
            car.setCar_type(updatedCar.getCar_type());
            car.setCompany(updatedCar.getCompany());
            car.setModel(updatedCar.getModel());
            car.setYear(updatedCar.getYear());
            car.setPrice(updatedCar.getPrice());
            car.setFuel_type(updatedCar.getFuel_type());
            car.setDealer(updatedCar.getDealer());
            car.setMileage(updatedCar.getMileage());
            car.setImageUrls(updatedCar.getImageUrls()); // if images are part of the update
            return carRepository.save(car);
        }
        return null;  // Or throw an exception if car not found
    }

    // Delete a car by id
    public boolean deleteCar(ObjectId id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
            return true;
        }
        return false;  // Or throw exception if car not found
    }
    public boolean deleteCar(ObjectId id, String userName) {
        User user = userService.findByUserName(userName);
        if (carRepository.existsById(id)) {
            user.getCarList().removeIf(x->x.getId().equals(id));
            userService.saveUser(user);
            carRepository.deleteById(id);
            return true;
        }
        return false;  // Or throw exception if car not found
    }


}
