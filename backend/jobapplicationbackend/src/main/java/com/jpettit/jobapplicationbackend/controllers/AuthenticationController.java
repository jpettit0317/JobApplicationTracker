package com.jpettit.jobapplicationbackend.controllers;

import com.jpettit.jobapplicationbackend.constants.CrossOriginAllowedUrls;
import com.jpettit.jobapplicationbackend.exceptions.UserExistsException;
import com.jpettit.jobapplicationbackend.models.requests.AuthenticationRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.services.AuthenticationService;
import com.jpettit.jobapplicationbackend.staticVars.Routes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Routes.BaseRoutes.authBaseRoute)
@RequiredArgsConstructor
@CrossOrigin(origins = CrossOriginAllowedUrls.port3000)
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping(Routes.PostRoutes.register)
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest) {
        try {
            return ResponseEntity.ok(authenticationService.register(registerRequest));
        } catch (UserExistsException usEx) {
            final AuthenticationResponse errorResponse = AuthenticationResponse.builder()
                    .token("")
                    .errorMessage(usEx.getMessage())
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .build();
            return new ResponseEntity<>(errorResponse, HttpStatus.OK);
        }
    }

    @PostMapping(Routes.PostRoutes.login)
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        return ResponseEntity.ok(authenticationService.login(authenticationRequest));
    }
}
