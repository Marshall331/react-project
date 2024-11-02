package com.kindsonthegenius.product_app.services;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kindsonthegenius.product_app.model.User;
import com.kindsonthegenius.product_app.repositories.UserRepository;

@Service
public class UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, BCryptPasswordEncoder bCryptPasswordEncoder1) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder1;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUser(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public String addUser(User user) {
        String result = "";

        if (this.userRepository.findByEmail(user.getEmail()) != null) {
            result += "Un compte avec cette email existe déjà. \n";
        }
        if (this.userRepository.findByUsername(user.getUsername()) != null) {
            result += "Un compte avec ce pseudo existe déjà. \n";
        }
        if (result.equals("")) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
        return result;
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public String authenticate(String email, String password) {

        String result = "";
        User user = userRepository.findByEmail(email);

        if (user == null || !user.getEmail().equals(email)) {
            result += "Ce compte n\'existe pas. \n";
        } else {
            if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
                result += "Le mot de passe est incorrect. \n";
            }
        }

        return result;
    }

}
