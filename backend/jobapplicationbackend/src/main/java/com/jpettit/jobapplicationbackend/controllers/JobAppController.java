package com.jpettit.jobapplicationbackend.controllers;

import com.jpettit.jobapplicationbackend.constants.CrossOriginAllowedUrls;
import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.services.JobAppService;
import com.jpettit.jobapplicationbackend.staticVars.Routes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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

    private void logAddJobAppRequest(AddJobAppRequest addJobAppRequest) {
        System.out.println("The request is " + addJobAppRequest.toString());
    }

    private void logDates(JobApplication jobApplication) {
        System.out.println("Date applied is ");
        logDate(jobApplication.getDateApplied());

        for (JobInterview i : jobApplication.getInterviews()) {
            System.out.println("Start date is ");
            logDate(i.getStartDate());
            System.out.println("End date is ");
            logDate(i.getEndDate());
        }
    }

    private void logDate(Date date) {
        final SimpleDateFormat sdf =
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");

        System.out.println("The date is " + sdf.format(date));
    }

    private void logLocalDateTime(JobApplication jobApp) {
        System.out.println("Local date times");
        final String dateAppliedString = jobApp.getDateApplied().toString();
        System.out.println("Date applied: " + LocalDateTime.parse(dateAppliedString, DateTimeFormatter.ISO_LOCAL_DATE_TIME));

        for (JobInterview i : jobApp.getInterviews()) {
            System.out.println("Start Date: " + LocalDateTime.parse(i.getStartDate().toString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            System.out.println("End Date: " + LocalDateTime.parse(i.getEndDate().toString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }
    }
}
