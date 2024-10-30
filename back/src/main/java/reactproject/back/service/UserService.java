/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

package reactproject.back.service;

import java.util.List;

import reactproject.back.model.User;

/**
 *
 * @author 1
 */
public interface UserService {

    public User saveUser(User user);

    public List<User> getAllUsers();

}
