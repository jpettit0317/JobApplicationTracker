package com.jpettit.jobapplicationbackend.staticVars;

public class ErrorMessages {
    public static class AuthMessages {
        public static String invalidInput = "Invalid email or password.";
    }

    public static class AddJobAppMessages {
        public static String unexpectedError = "Something went wrong!!";
    }

    public static class DeleteJobAppMessages {
        public static String couldNotDeleteJobApp = "Couldn't delete job app";
    }

    public static class OtherMessages {
        public static String jobAppDoesnotExistError = "Job app doesn't exist.";
        public static String unexpectedError = "Something went wrong!!";
        public static String tokenExpiredError = "Token expired!";
    }

}
