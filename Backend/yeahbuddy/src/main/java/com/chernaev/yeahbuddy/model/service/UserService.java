package com.chernaev.yeahbuddy.model.service;

import com.chernaev.yeahbuddy.model.entity.DTO.UserDetailsDTO;
import com.chernaev.yeahbuddy.model.entity.DTO.UserInfoDTO;
import com.chernaev.yeahbuddy.model.entity.ShoppingList;
import com.chernaev.yeahbuddy.model.entity.User;
import com.chernaev.yeahbuddy.model.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserInfoDTO getUserInfo(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

        UserInfoDTO userInfoDTO = new UserInfoDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getAge(),
                user.getGender(),
                user.getHeight(),
                user.getWeight(),
                user.getActivity(),
                user.getGoal()
        );

        return userInfoDTO;
    }

    public User updateUserDetails(UserDetailsDTO userDetails) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow();

        user.setAge(userDetails.getAge());
        user.setHeight(userDetails.getHeight());
        user.setWeight(userDetails.getWeight());
        user.setActivity(userDetails.getActivity());
        user.setGoal(userDetails.getGoal());

        return userRepository.save(user);
    }

    public User setUserInfo(UserInfoDTO userInfo) {
        User user = userRepository.findById(userInfo.getId()).orElseThrow();

        user.setAge(userInfo.getAge());
        user.setHeight(userInfo.getHeight());
        user.setWeight(userInfo.getWeight());
        user.setActivity(userInfo.getActivity());
        user.setGoal(userInfo.getGoal());
        user.setGender(userInfo.getGender());
        user.setShoppingList(new ShoppingList());

        return userRepository.save(user);
    }
}
