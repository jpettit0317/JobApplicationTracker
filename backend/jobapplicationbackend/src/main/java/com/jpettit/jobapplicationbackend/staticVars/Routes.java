package com.jpettit.jobapplicationbackend.staticVars;

public class Routes {
    public static class BaseRoutes {
        public static final String authBaseRoute = "/api/v1/auth";
        public static final String allAuthRoutes = "/api/v1/auth/**";
    }
    public static class PostRoutes {
        public static final String register = "/register";
        public static final String login = "/authenticate";
    }
}
