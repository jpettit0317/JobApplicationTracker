package com.jpettit.jobapplicationbackend.exceptions;

public class UserExistsException extends Exception {
    public UserExistsException(String errorMessage) {
        super(errorMessage);
    }
}
