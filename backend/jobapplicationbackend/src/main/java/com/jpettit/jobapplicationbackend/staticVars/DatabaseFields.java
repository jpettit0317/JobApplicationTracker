package com.jpettit.jobapplicationbackend.staticVars;

public class DatabaseFields {
    public static class JobAppFields {
        public static final String id = "jobappdataid";
        public static final String company = "company";
        public static final String creator = "creator";
        public static final String dateApplied = "dateapplied";
        public static final String dateModified = "datemodified";
        public static final String description = "description";
        public static final String jobTitle = "jobtitle";
        public static final String status = "status";
    }

    public static class JobInterviewFields {
        public static final String id = "id";
        public static final String endDate = "enddate";
        public static final String jobAppId = "jobappid";
        public static final String location = "location";
        public static final String startDate = "startdate";
        public static final String type = "type";
    }
}
