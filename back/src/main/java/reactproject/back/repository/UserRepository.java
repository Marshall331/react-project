/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

package reactproject.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import reactproject.back.model.User;

/**
 *
 * @author 1
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
