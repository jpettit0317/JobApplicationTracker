package com.jpettit.jobapplicationbackend.models.responses;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.helpers.ObjectMapperHelper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse implements JSONStringable {
    private String token;
    private String errorMessage;
    private int statusCode;

    private String errorType;

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
