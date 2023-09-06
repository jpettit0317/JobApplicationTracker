package com.jpettit.jobapplicationbackend.exceptions;

public class TokenExpiredException extends Exception {
    public TokenExpiredException(String errorMessage) {
        super(errorMessage);
    }
}
