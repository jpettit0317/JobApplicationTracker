package com.jpettit.jobapplicationbackend.models.responses;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String errorMessage;
    private int statusCode;

    private String errorType;
}
