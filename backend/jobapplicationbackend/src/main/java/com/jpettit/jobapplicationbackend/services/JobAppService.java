package com.jpettit.jobapplicationbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.exceptions.NonExistantUserException;
import com.jpettit.jobapplicationbackend.exceptions.TokenExpiredException;
import com.jpettit.jobapplicationbackend.helpers.SpringDataConverter;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.GetNewJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.DeleteJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;
import com.jpettit.jobapplicationbackend.repos.JobAppDataRepository;
import com.jpettit.jobapplicationbackend.repos.JobInterviewDataRepository;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobAppService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final JobAppDataRepository jobAppDataRepository;

    private final JobInterviewDataRepository jobInterviewDataRepository;

    @Transactional
    public DeleteJobAppResponse deleteJobApp(UUID id, String token) {
        try {
            final String user = validateUser(token);
            final long numberOfInterviews = jobInterviewDataRepository.countByJobAppId(id);

            if (numberOfInterviews > 0L) {
                jobInterviewDataRepository.removeByJobAppId(id);
            }

            jobAppDataRepository.removeByJobAppDataIdAndCreator(id, user);

            return createResponse(HttpStatus.OK.value(), "", ErrorType.NONE);
        } catch (TokenExpiredException | ExpiredJwtException e) {
            return createResponse(HttpStatus.FORBIDDEN.value(),
                    ErrorMessages.OtherMessages.tokenExpiredError, ErrorType.TOKEN_EXPIRED);
        } catch (Exception e) {
            e.printStackTrace();
            return createResponse(HttpStatus.FORBIDDEN.value(),
                    ErrorMessages.OtherMessages.unexpectedError, ErrorType.OTHER);
        }
    }

    private DeleteJobAppResponse createResponse(int statusCode, String errorMessage, String errorType) {
        return DeleteJobAppResponse.builder()
                .statusCode(statusCode)
                .errorMessage(errorMessage)
                .errorType(errorType)
                .build();
    }
    public GetJobAppsResponse getNewJobApps(GetNewJobAppRequest req) {
        try {
            validateUser(req.getToken());

            final ArrayList<JobApplication> jobApps = getNewJobAppsFromDB(req.getLastChecked());
            return GetJobAppsResponse.builder()
                    .errorMessage("")
                    .statusCode(HttpStatus.OK.value())
                    .jobApps(jobApps)
                    .errorType(ErrorType.NONE)
                    .build();
        } catch (TokenExpiredException | ExpiredJwtException e) {
            return createGetAllJobsAppsErrorResponse(HttpStatus.FORBIDDEN, ErrorType.TOKEN_EXPIRED, ErrorMessages.OtherMessages.tokenExpiredError);
        } catch (Exception e) {
            return createGetAllJobsAppsErrorResponse(HttpStatus.NOT_FOUND, ErrorType.OTHER, ErrorMessages.OtherMessages.unexpectedError);
        }
    }

    public AddJobAppResponse addJobApp(final AddJobAppRequest req) {
        try {
            final String user = validateUser(req.getToken());

            if (!req.getJobApp().isJobAppValid()) {
                return createErrorResponse(HttpStatus.FORBIDDEN, ErrorType.OTHER);
            }

            addJobAppToDatabase(req.getJobApp(), user);
        } catch (NonExistantUserException e) {
            return createErrorResponse(HttpStatus.NOT_FOUND, ErrorType.OTHER);
        } catch (TokenExpiredException e) {
            return createTokenExpiredResponse();
        } catch (Exception e) {
            return createErrorResponse(HttpStatus.FORBIDDEN, ErrorType.OTHER);
        }

        return createAddSuccessfulResponse();
    }

    private void addJobAppToDatabase(final JobApplication jobApp, final String creator) throws JsonProcessingException {
        final String jobAppString = jobApp.toJSONString();
        System.out.println("Job App string is " + jobAppString);
        final UUID jobAppId = saveJobApp(jobApp, creator);

        if (!jobApp.getInterviews().isEmpty()) {
            saveJobInterviews(jobApp.getInterviews(), jobAppId);
        }
    }

    private UUID saveJobApp(JobApplication jobApp, final String creator) {
        final JobAppData jobAppToSave = JobAppData.initFromJobApp(jobApp, creator);

        return jobAppDataRepository.save(jobAppToSave).getJobAppDataId();
    }

    private void saveJobInterviews(ArrayList<JobInterview> interviews, UUID jobAppId) {
        final ArrayList<JobInterviewData> dataInterviews = SpringDataConverter.convertJobInterviewToData(interviews, jobAppId);

        jobInterviewDataRepository.saveAll(dataInterviews);
    }

    private ArrayList<JobApplication> getNewJobAppsFromDB(ZonedDateTime date) {
        ArrayList<JobApplication> jobApps = new ArrayList<>();
        final ArrayList<JobAppData> jobAppData = new ArrayList<>(jobAppDataRepository.findByDateModifiedAfter(date));

        for (JobAppData i : jobAppData) {

            final JobApplication jobApp = JobApplication.builder()
                    .jobTitle(i.getJobTitle())
                    .interviews(new ArrayList<>())
                    .description(i.getDescription())
                    .dateModified(i.getDateModified())
                    .dateApplied(i.getDateApplied())
                    .id(i.getJobAppDataId())
                    .company(i.getCompany())
                    .status(i.getStatus())
                    .build();

            jobApps.add(jobApp);
        }

        return jobApps;
    }

    private AddJobAppResponse createErrorResponse(final HttpStatus status, final String errorType) {
        return AddJobAppResponse.builder()
                .errorMessage(ErrorMessages.AddJobAppMessages.unexpectedError)
                .statusCode(status.value())
                .errorType(errorType)
                .build();
    }

    private AddJobAppResponse createAddSuccessfulResponse()  {
        return AddJobAppResponse.builder()
                .errorMessage("")
                .errorType(ErrorType.NONE)
                .statusCode(HttpStatus.CREATED.value())
                .build();
    }
    private AddJobAppResponse createTokenExpiredResponse() {
        return AddJobAppResponse.builder()
                .errorMessage(ErrorMessages.OtherMessages.tokenExpiredError)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .errorType(ErrorType.TOKEN_EXPIRED)
                .build();
    }
    private void validateToken(String token) throws TokenExpiredException {
        if (jwtService.isTokenExpired(token)) {
           throw new TokenExpiredException("Token has expired.");
        }
    }

    private void checkIfUserExists(String username) throws NonExistantUserException {
        if (userRepository.findByEmail(username).isEmpty()) {
            throw new NonExistantUserException(username + " doesn't exist.");
        }
    }

    private String getUsernameFromToken(String token) {
        return jwtService.extractUsername(token);
    }
    private String validateUser(String token)
            throws NonExistantUserException, TokenExpiredException {
        validateToken(token);
        final String username = getUsernameFromToken(token);
        checkIfUserExists(username);

        return username;
    }

    private GetJobAppsResponse createGetAllJobsAppsErrorResponse(final HttpStatus status,
                                                                 final String error,
                                                                 final String errorMessage) {
        return GetJobAppsResponse.builder()
                .jobApps(new ArrayList<>())
                .statusCode(status.value())
                .errorType(error)
                .errorMessage(errorMessage)
                .build();
    }

    private GetJobAppsResponse createValidJobAppsResponse(final HttpStatus status,
                                                          final String error,
                                                          final String errorMessage,
                                                          final ArrayList<JobApplication> list) {
        return GetJobAppsResponse.builder()
                .jobApps(list)
                .statusCode(status.value())
                .errorType(error)
                .errorMessage(errorMessage)
                .build();
    }
    public GetJobAppsResponse getAllJobApps(final String token) {
        try {
            final String username = validateUser(token);
            final ArrayList<JobApplication> jobApps = convertJobAppDataToJobApps(username);

            return createValidJobAppsResponse(HttpStatus.OK, ErrorType.NONE, "", jobApps);
        } catch (NonExistantUserException e) {
            e.printStackTrace();
            return createGetAllJobsAppsErrorResponse(HttpStatus.NOT_FOUND,
                    ErrorType.OTHER, ErrorMessages.AddJobAppMessages.unexpectedError);
        } catch (TokenExpiredException | ExpiredJwtException e) {
            e.printStackTrace();
            return createGetAllJobsAppsErrorResponse(HttpStatus.FORBIDDEN,
                    ErrorType.TOKEN_EXPIRED, ErrorMessages.OtherMessages.tokenExpiredError);
        }
    }

    private ArrayList<JobApplication> convertJobAppDataToJobApps(final String username) {
        final ArrayList<JobAppData> data =
                new ArrayList<>(jobAppDataRepository.findByCreator(username));

        return SpringDataConverter.convertJobAppDataToJobApps(data);
    }
}
