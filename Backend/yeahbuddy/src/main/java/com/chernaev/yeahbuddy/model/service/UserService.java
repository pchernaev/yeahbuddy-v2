package com.chernaev.yeahbuddy.model.service;

import com.chernaev.yeahbuddy.model.entity.DTO.UserInfoDTO;
import com.chernaev.yeahbuddy.model.entity.User;
import com.chernaev.yeahbuddy.model.repository.UserRepository;
import jakarta.transaction.Transactional;
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
                user.getUserInfo().getAge(),
                user.getUserInfo().getGender(),
                user.getUserInfo().getHeight(),
                user.getUserInfo().getWeight(),
                user.getUserInfo().getActivity(),
                user.getUserInfo().getGoal()
        );

        return userInfoDTO;
    }
}
