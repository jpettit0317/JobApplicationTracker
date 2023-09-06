package com.jpettit.jobapplicationbackend.services;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.exceptions.NonExistantUserException;
import com.jpettit.jobapplicationbackend.exceptions.TokenExpiredException;
import com.jpettit.jobapplicationbackend.helpers.SpringDataConverter;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.models.pairs.JobAppPair;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.repos.JobAppDataRepository;
import com.jpettit.jobapplicationbackend.repos.JobInterviewDataRepository;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobAppService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final JobAppDataRepository jobAppDataRepository;

    private final JobInterviewDataRepository jobInterviewDataRepository;

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


    private void addJobAppToDatabase(final JobApplication jobApp, final String creator) {

        final UUID jobAppId = saveJobApp(jobApp, creator);

        if (!jobApp.getInterviews().isEmpty()) {
            saveJobInterviews(jobApp.getInterviews(), jobAppId);
        }
    }

    private UUID saveJobApp(JobApplication jobApp, final String creator) {
        final JobAppData jobAppToSave = JobAppData.initFromJobApp(jobApp, creator);

        return jobAppDataRepository.save(jobAppToSave).getId();
    }

    private void saveJobInterviews(ArrayList<JobInterview> interviews, UUID jobAppId) {
        final ArrayList<JobInterviewData> dataInterviews = SpringDataConverter.convertJobInterviewToData(interviews, jobAppId);

        jobInterviewDataRepository.saveAll(dataInterviews);
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
                .errorMessage("Token expired.")
                .statusCode(HttpStatus.NOT_FOUND.value())
                .errorType(ErrorType.OTHER)
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
}
