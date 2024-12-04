package com.example.carmanagement.backend.controller;

import com.example.carmanagement.backend.entity.Car;
import com.example.carmanagement.backend.entity.User;
import com.example.carmanagement.backend.service.CarService;
import com.example.carmanagement.backend.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
public class CarController {
    @Autowired
    private CarService carService;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllCars(){
     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
     String userName = authentication.getName();
     User user = userService.findByUserName(userName);
        List<Car> all_cars = user.getCarList();
        if(all_cars.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(all_cars,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addCar(@RequestBody Car car){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        carService.saveCar(car,userName);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCarById(@PathVariable ObjectId id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);
        List<Car> collect = user.getCarList().stream().filter(x -> x.getId().equals(id)).toList();
        if (!collect.isEmpty()) {
            Optional<Car> carDetail = carService.getCarById(id);
            return new ResponseEntity<>(carDetail, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCarById(@PathVariable ObjectId id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);
        List<Car> collect = user.getCarList().stream().filter(x -> x.getId().equals(id)).toList();
        if (!collect.isEmpty()) {
            carService.deleteCar(id, userName);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PutMapping("/id:{id}")
    public ResponseEntity<?> updateCar(@PathVariable ObjectId id, @RequestBody Car newCarDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);
        List<Car> cars = user.getCarList().stream().filter(car -> car.getId().equals(id)).toList();
        if (!cars.isEmpty()) {
            Car oldCar = carService.getCarById(id).orElse(null);
            if (oldCar != null) {
                oldCar.setCar_type(newCarDetails.getCar_type() != null ? newCarDetails.getCar_type() : oldCar.getCar_type());
                oldCar.setCompany(newCarDetails.getCompany() != null ? newCarDetails.getCompany() : oldCar.getCompany());
                oldCar.setModel(newCarDetails.getModel() != null ? newCarDetails.getModel() : oldCar.getModel());
                oldCar.setYear(newCarDetails.getYear() != null ? newCarDetails.getYear() : oldCar.getYear());
                oldCar.setPrice(newCarDetails.getPrice() != null ? newCarDetails.getPrice() : oldCar.getPrice());
                oldCar.setFuel_type(newCarDetails.getFuel_type() != null ? newCarDetails.getFuel_type() : oldCar.getFuel_type());
                oldCar.setMileage(newCarDetails.getMileage() != null ? newCarDetails.getMileage() : oldCar.getMileage());
                oldCar.setDealer(newCarDetails.getDealer() != null ? newCarDetails.getDealer() : oldCar.getDealer());
                carService.saveCar(oldCar);

                return new ResponseEntity<>(oldCar, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

