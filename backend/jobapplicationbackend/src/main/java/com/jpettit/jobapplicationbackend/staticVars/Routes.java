package com.jpettit.jobapplicationbackend.staticVars;

public class Routes {
    public static class BaseRoutes {
        public static final String authBaseRoute = "/api/v1/auth";
        public static final String allAuthRoutes = "/api/v1/auth/**";
        public static final String allMainRoutes = "/api/v1/main/**";

        public static final String mainRoute = "/api/v1/main";
    }
    public static class PostRoutes {
        public static final String register = "/register";
        public static final String login = "/login";

        public static final String addJobApp = "/addJobApp";
    }
    public static class GetRoutes {
        public static final String getAllJobApps = "/getAllJobApps";
        public static final String getNewJobApps = "/getNewJobApps";
        public static final String getJobAppById = "/getJobAppById";
    }

    public static class DeleteRoutes {
        public static final String deleteJobApp = "/deleteJobApp";
    }
}
