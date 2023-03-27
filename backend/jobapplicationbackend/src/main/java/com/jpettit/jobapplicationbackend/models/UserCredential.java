package com.jpettit.jobapplicationbackend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserCredential {
    private String emailAddress;
    private String password;

    private UserCredential(String email, String password) {
        this.emailAddress = email;
        this.password = password;
    }

    public static UserCredential createCredential(String email, String password) {
        return new UserCredential(email, password);
    }

    public boolean isInvalid() {
       return getPassword().isEmpty() || getEmailAddress().isEmpty();
    }

    @Override
    public String toString() {
        return String.format("Email: %s, Password: %s", getEmailAddress(), getPassword());
    }
}
