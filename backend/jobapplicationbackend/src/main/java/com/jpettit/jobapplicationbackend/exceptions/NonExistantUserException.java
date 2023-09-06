package com.jpettit.jobapplicationbackend.exceptions;

public class NonExistantUserException extends Exception {
    public NonExistantUserException(String errorMessage) {
        super(errorMessage);
    }
}
