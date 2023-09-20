package com.jpettit.jobapplicationbackend.controllers;

import com.jpettit.jobapplicationbackend.constants.CrossOriginAllowedUrls;
import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.helpers.DateConverter;
import com.jpettit.jobapplicationbackend.helpers.StringUtility;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.GetNewJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.DeleteJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;
import com.jpettit.jobapplicationbackend.services.JobAppService;
import com.jpettit.jobapplicationbackend.staticVars.DateFormats;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import com.jpettit.jobapplicationbackend.staticVars.Routes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;


@RequestMapping(Routes.BaseRoutes.mainRoute)
@CrossOrigin(origins = CrossOriginAllowedUrls.port3000, methods = {
        RequestMethod.POST,
        RequestMethod.GET,
        RequestMethod.DELETE,
        RequestMethod.PUT,
        RequestMethod.PATCH
})
@RequiredArgsConstructor
@RestController
public class JobAppController {
    private final JobAppService jobAppService;

    @PostMapping(value = Routes.PostRoutes.addJobApp)
    public ResponseEntity<AddJobAppResponse> addJobApp(@RequestBody AddJobAppRequest request) {
        return ResponseEntity.ok(jobAppService.addJobApp(request));
    }

    @GetMapping(value = Routes.GetRoutes.getAllJobApps)
    public ResponseEntity<GetJobAppsResponse> getAllJobApps(@RequestParam(value = "token", defaultValue = "") String token) {
        try {
            return ResponseEntity.ok(jobAppService.getAllJobApps(token));
        } catch (Exception e) {
            e.printStackTrace();
            final GetJobAppsResponse errorResponse = createGetAllJobAppsErrorResponse();
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = Routes.GetRoutes.getNewJobApps)
    public ResponseEntity<GetJobAppsResponse> getNewJobApps(
            @RequestParam(value = "token", defaultValue = "") String token,
            @RequestParam(value = "lastDateChecked", defaultValue = "") String lastDateCheckedMilliseconds) {
        try {
            final GetNewJobAppRequest newJobAppReq = GetNewJobAppRequest.builder()
                    .lastChecked(convertDateStringToDate(lastDateCheckedMilliseconds))
                    .token(token)
                    .build();
            return ResponseEntity.ok(jobAppService.getNewJobApps(newJobAppReq));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(
                    GetJobAppsResponse.builder()
                            .jobApps(new ArrayList<>())
                            .errorType(ErrorType.OTHER)
                            .statusCode(HttpStatus.FORBIDDEN.value())
                            .errorMessage(e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping(value = Routes.DeleteRoutes.deleteJobApp)
    public DeleteJobAppResponse deleteJobApp(
            @RequestParam(value = "id", defaultValue = "") String id,
            @RequestParam(value = "token", defaultValue = "") String token) {
        try {
            return jobAppService.deleteJobApp(UUID.fromString(id), token);
        } catch (Exception e) {
            e.printStackTrace();
            return DeleteJobAppResponse.builder()
                    .errorMessage(ErrorMessages.DeleteJobAppMessages.couldNotDeleteJobApp)
                    .errorType(ErrorType.OTHER)
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .build();
        }
    }

    private ZonedDateTime convertDateStringToDate(final String timeStamp) throws ParseException {
        final String timeStampNoDoubleQuotes = stripDoubleQuotesOut(timeStamp);
        return DateConverter.convertTimeStampToLocalDateTime(timeStampNoDoubleQuotes);
    }

    private String stripDoubleQuotesOut(String input) {
        return StringUtility.removeDoubleQuotesFromString(input);
    }
    private GetJobAppsResponse createGetAllJobAppsErrorResponse() {
        return GetJobAppsResponse.builder()
                .jobApps(new ArrayList<>())
                .errorMessage(ErrorMessages.OtherMessages.unexpectedError)
                .statusCode(HttpStatus.NOT_FOUND.value())
                .errorType(ErrorType.OTHER)
                .build();
    }
}
