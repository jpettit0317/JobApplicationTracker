package com.jpettit.jobapplicationbackend.models.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    private String email;
    private String password;

    public boolean isRequestValid() {
        return !this.getEmail().equals("") &&
                !this.getPassword().equals("");
    }

    @Override
    public String toString() {
        return "Email : " + this.getEmail() +
                ", Password: " + this.getPassword();
    }
}
