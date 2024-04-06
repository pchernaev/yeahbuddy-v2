package com.chernaev.yeahbuddy.model.entity;


import com.chernaev.yeahbuddy.model.entity.enums.ActivityEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GenderEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GoalEnum;
import com.chernaev.yeahbuddy.model.entity.enums.RoleEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseEntity implements UserDetails {
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Size(max = 50)
    @Email
    @Column(nullable = false)
    private String email;

    @Size(max = 120)
    @Column(nullable = false)
    private String password;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = true)
    private RoleEnum role;

    @Column(nullable = true)
    private int age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private GenderEnum gender;

    @Column(nullable = true)
    private int height;

    @Column(nullable = true)
    private int weight;

    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private ActivityEnum activity;

    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private GoalEnum goal;

    @OneToMany(targetEntity = Meal.class, mappedBy = "user")
    private List<Meal> meals = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shopping_list_id", referencedColumnName = "id")
    private ShoppingList shoppingList;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
