package com.jpettit.jobapplicationbackend.models.requests;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jpettit.jobapplicationbackend.helpers.ObjectMapperHelper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest implements JSONStringable {
    private String email;
    private String password;

    public boolean isRequestValid() {
        return !this.getEmail().equals("") &&
                !this.getPassword().equals("");
    }

    @Override
    public String toJSONString() {
        try {
            return ObjectMapperHelper.createObjectMapper()
                    .writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "";
        }
    }
}
