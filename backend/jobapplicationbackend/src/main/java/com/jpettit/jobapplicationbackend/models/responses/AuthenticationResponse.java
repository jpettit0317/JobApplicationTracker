package com.jpettit.jobapplicationbackend.models.responses;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String errorMessage;
    private int statusCode;
}
