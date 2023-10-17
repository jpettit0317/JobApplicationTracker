package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.jayway.jsonpath.JsonPath;
import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.responses.*;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import com.jpettit.jobapplicationbackend.staticVars.Routes;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class JobControllerIntTestHelperVars {
    private static final UUID id = UUID.randomUUID();
    private static final ZoneId utcZone = ZoneId.of(JobAppTimeZone.UTC);

    public static final ZonedDateTime maxDate = ZonedDateTime.of(2000, 1, 1, 0,
            1, 1, 1, utcZone);

    public static final ZonedDateTime jan1_3000 = ZonedDateTime.of(3000, 1, 1, 0,
            1, 1, 1, utcZone);
    public static final ZonedDateTime minDate = ZonedDateTime.of(1970, 1, 1, 0,
            1, 1, 1, utcZone);

    public static final User userJane = User.builder()
            .firstname("Jane")
            .lastname("Doe")
            .email("noname@email.com")
            .password("password94_")
            .role(Role.USER)
            .id(1L)
            .build();

    public static final User userJon = User.builder()
            .firstname("Jon")
            .lastname("Doe")
            .email("jondoe@email.com")
            .password("password94_")
            .role(Role.USER)
            .id(2L)
            .build();

    public static final String addJobAppURL = Routes.BaseRoutes.mainRoute + Routes.PostRoutes.addJobApp;
    public static final String addUserURL = Routes.BaseRoutes.authBaseRoute + Routes.PostRoutes.register;

    public static final String baseGetAllJobAppsURL = Routes.BaseRoutes.mainRoute + Routes.GetRoutes.getAllJobApps;
    public static final String baseGetNewJobAppsURL = Routes.BaseRoutes.mainRoute + Routes.GetRoutes.getNewJobApps;

    public static final String baseDeleteJobAppsURL = Routes.BaseRoutes.mainRoute + Routes.DeleteRoutes.deleteJobApp;
    public static final String baseGetOneJobAppURL = Routes.BaseRoutes.mainRoute + Routes.GetRoutes.getJobAppById;

    public static final String baseEditJobAppURL = Routes.BaseRoutes.mainRoute + Routes.EditRoutes.editJobApp;

    public static class JsonPaths {
        public static class JobInterviewPaths {
            static final String jobInterviewPath = "interviews";
            static final String idPath = "id";
            static final String jobInterviewJobAppIdPath = "jobAppId";
            static final String typePath = "type";
            static final String locationPath = "location";
            static final String startDatePath = "startDate";
            static final String endDatePath = "endDate";
        }

        public static class JobAppPaths {
            static final String basePath = "jobApp";
            static final String companyPath = "company";
            static final String jobTitlePath = "jobTitle";
            static final String descPath = "description";
            static final String statusPath = "status";
            static final String jobAppIdPath = "id";
            static final String dateAppliedPath = "dateApplied";
            static final String dateModifiedPath = "dateModified";
        }

        public static class ResponsePaths {
            static final String responseErrorMessage = "errorMessage";
            static final String errorTypePath = "errorType";
            static final String statusCodePath = "statusCode";
        }
    }

    public static final JobApplication noInterviewJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(UUID.randomUUID())
            .dateApplied(minDate)
            .dateModified(minDate)
            .interviews(new ArrayList<>())
            .build();

    private static final UUID oneInterviewJobAppId = UUID.randomUUID();
    public static JobApplication oneInterviewJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(oneInterviewJobAppId)
            .dateApplied(minDate)
            .dateModified(minDate)
            .interviews(new ArrayList<>(List.of(JobInterview.builder()
                            .id(UUID.randomUUID())
                            .jobAppId(oneInterviewJobAppId)
                            .type("Technical")
                            .location("Online")
                            .startDate(maxDate)
                            .endDate(maxDate)
                    .build())))
            .build();

    public static final JobInterview uuidJobInterview = JobInterview.builder()
            .id(UUID.randomUUID())
            .jobAppId(id)
            .type(UUID.randomUUID().toString())
            .location(UUID.randomUUID().toString())
            .startDate(maxDate)
            .endDate(maxDate)
            .build();

    public static final JobApplication uuidJobApp = JobApplication.builder()
            .jobTitle(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .company(UUID.randomUUID().toString())
            .status(UUID.randomUUID().toString())
            .id(id)
            .dateModified(maxDate)
            .dateApplied(maxDate)
            .interviews(new ArrayList<>(List.of(uuidJobInterview)))
            .build();

    public static String getTokenFromResponse(String input) {
        return JsonPath.read(input, "$.token");
    }

    public static AddJobAppResponse getResponseFromString(final String input) {
        final String errorMessage = JsonPath.read(input, "$.errorMessage");
        final String errorType = JsonPath.read(input, "$.errorType");
        final int statusCode = JsonPath.read(input, "$.statusCode");

        return AddJobAppResponse.builder()
                .errorMessage(errorMessage)
                .errorType(errorType)
                .statusCode(statusCode)
                .build();
    }

    public static GetJobAppsResponse getJobAppsResponse(String input) {
        final String errorMessage = JsonPath.read(input, "$.errorMessage");
        final String errorType = JsonPath.read(input, "$.errorType");
        final int statusCode = JsonPath.read(input, "$.statusCode");
        final ArrayList<JobApplication> jobApps = JsonPath.read(input, "$.jobApps");

        return GetJobAppsResponse.builder()
                .jobApps(jobApps)
                .errorType(errorType)
                .statusCode(statusCode)
                .errorMessage(errorMessage)
                .build();
    }

    public static DeleteJobAppResponse getDeleteJobAppsResponse(String input) {
        final String errorMessage = JsonPath.read(input, "$.errorMessage");
        final String errorType = JsonPath.read(input, "$.errorType");
        final int statusCode = JsonPath.read(input, "$.statusCode");

        return DeleteJobAppResponse.builder()
                .errorMessage(errorMessage)
                .statusCode(statusCode)
                .errorType(errorType)
                .build();
    }

    public static GetOneJobAppResponse getOneJobAppResponse(JSONObject jsonObject) throws JSONException {
        final String errorMessage = jsonObject.getString(JsonPaths.ResponsePaths.responseErrorMessage);
        final String errorType = jsonObject.getString(JsonPaths.ResponsePaths.errorTypePath);
        final int statusCode = jsonObject.getInt(JsonPaths.ResponsePaths.statusCodePath);
        final JobApplication jobApp = getJobApp(jsonObject);

        return GetOneJobAppResponse.builder()
                .errorMessage(errorMessage)
                .errorType(errorType)
                .statusCode(statusCode)
                .jobApp(jobApp)
                .build();
    }

    public static boolean isJobAppNull(JSONObject input) {
        return input.isNull(JsonPaths.JobAppPaths.basePath);
    }
    public static JobApplication getJobApp(JSONObject jsonObject) throws JSONException {
        if (isJobAppNull(jsonObject)) {
            return null;
        }
        final JSONObject jobAppObj = jsonObject.getJSONObject(JsonPaths.JobAppPaths.basePath);

        final String company = jobAppObj.getString(JsonPaths.JobAppPaths.companyPath);
        final String jobTitle = jobAppObj.getString(JsonPaths.JobAppPaths.jobTitlePath);
        final String description = jobAppObj.getString(JsonPaths.JobAppPaths.descPath);
        final String status = jobAppObj.getString(JsonPaths.JobAppPaths.statusPath);
        final UUID id = convertStringToUUID(jobAppObj, JsonPaths.JobAppPaths.jobAppIdPath);
        final ZonedDateTime dateApplied = convertStringToDate(jobAppObj, JsonPaths.JobAppPaths.dateAppliedPath);
        final ZonedDateTime dateModified = convertStringToDate(jobAppObj, JsonPaths.JobAppPaths.dateModifiedPath);
        final ArrayList<JobInterview> jobInterview = getJobInterview(jobAppObj);

        return JobApplication.builder()
                .jobTitle(jobTitle)
                .company(company)
                .description(description)
                .status(status)
                .id(id)
                .dateApplied(dateApplied)
                .dateModified(dateModified)
                .interviews(jobInterview)
                .build();
    }

    public static ArrayList<JobInterview> getJobInterview(final JSONObject jsonObject) throws JSONException {
        ArrayList<JobInterview> jobInterviews = new ArrayList<>();
        final JSONArray jsonArray = jsonObject.getJSONArray(JsonPaths.JobInterviewPaths.jobInterviewPath);

        for (int i = 0; i < jsonArray.length(); i++) {
            final JSONObject obj = jsonArray.getJSONObject(i);
            jobInterviews.add(createJobInterview(obj));
        }
        return  jobInterviews;
    }

    private static JobInterview createJobInterview(final JSONObject jsonObject) throws JSONException {
        final UUID id = convertStringToUUID(jsonObject, JsonPaths.JobInterviewPaths.idPath);
        final UUID jobAppId = convertStringToUUID(jsonObject, JsonPaths.JobInterviewPaths.jobInterviewJobAppIdPath);
        final String type = jsonObject.getString(JsonPaths.JobInterviewPaths.typePath);
        final String location = jsonObject.getString(JsonPaths.JobInterviewPaths.locationPath);
        final ZonedDateTime startDate = convertStringToDate(jsonObject, JsonPaths.JobInterviewPaths.startDatePath);
        final ZonedDateTime endDate = convertStringToDate(jsonObject, JsonPaths.JobInterviewPaths.endDatePath);

        return JobInterview.builder()
                .id(id)
                .jobAppId(jobAppId)
                .type(type)
                .location(location)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

    private static UUID convertStringToUUID(final JSONObject jsonObject, final String path) throws JSONException {
        return UUID.fromString(jsonObject.getString(path));
    }

    private static ZonedDateTime convertStringToDate(final JSONObject jsonObject, final String path) throws JSONException {
        final String dateString = jsonObject.getString(path);
        final Instant instant = Instant.parse(dateString);
        return ZonedDateTime.ofInstant(instant, ZoneId.of("UTC"));
    }

    public static String createGetJobAppsURL(final String url, final String token) {
        return url +
                "?token=" +
                token;
    }

    public static EditJobAppResponse createEditJobAppResponseFromString(final String resp) throws JSONException {
        final JSONObject respJSON = new JSONObject(resp);

        return EditJobAppResponse.builder()
                .errorMessage(respJSON.getString(JsonPaths.ResponsePaths.responseErrorMessage))
                .errorType(respJSON.getString(JsonPaths.ResponsePaths.errorTypePath))
                .statusCode(respJSON.getInt(JsonPaths.ResponsePaths.statusCodePath))
                .build();
    }

    public static String createGetNewJobAppsURL(final String url, final String token,
                                                final ZonedDateTime dateLastChecked,
                                                final DateTimeFormatter formatter) {
        final String dateLastCheckedString = dateLastChecked.format(formatter);
        return url +
                "?token=" +
                token + "&" +
                "lastDateChecked=" + dateLastCheckedString;
    }

    public static String createDeleteJobAppURL(final String url, final String token,
                                               final UUID id) {
        return url + "?id=" + id + "&token=" + token;
    }

    public static String createGetJobAppById(final String url, final String token, final UUID id) {
        return url + "?id=" + id + "&token=" + token;
    }
}
