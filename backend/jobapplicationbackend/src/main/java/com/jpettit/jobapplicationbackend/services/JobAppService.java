package com.jpettit.jobapplicationbackend.services;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.exceptions.NonExistantUserException;
import com.jpettit.jobapplicationbackend.exceptions.TokenExpiredException;
import com.jpettit.jobapplicationbackend.helpers.SpringDataConverter;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.EditJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.GetNewJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.GetOneJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.*;
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
import java.util.*;

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
                return createErrorResponse(HttpStatus.FORBIDDEN);
            }

            addJobAppToDatabase(req.getJobApp(), user);
        } catch (NonExistantUserException e) {
            return createErrorResponse(HttpStatus.NOT_FOUND);
        } catch (TokenExpiredException e) {
            return createTokenExpiredResponse();
        } catch (Exception e) {
            return createErrorResponse(HttpStatus.FORBIDDEN);
        }

        return createAddSuccessfulResponse();
    }

    private void addJobAppToDatabase(final JobApplication jobApp, final String creator) {
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

    public GetOneJobAppResponse getJobAppById(GetOneJobAppRequest req) {
        try {
            final String username = validateUser(req.getToken());
            final ArrayList<JobInterviewData> dataInterviews =
                    new ArrayList<>(jobInterviewDataRepository
                            .findJobInterviewDataByJobAppId(req.getId()));
            final Optional<JobAppData> data = jobAppDataRepository
                    .findByJobAppDataIdAndCreator(req.getId(), username);

            if (data.isPresent()) {
                final JobApplication jobApp = SpringDataConverter
                        .createJobAppFromJobInterviewDataAndJobAppData(data.get(), dataInterviews);

                return GetOneJobAppResponse.builder()
                        .errorType(ErrorType.NONE)
                        .statusCode(HttpStatus.OK.value())
                        .errorMessage("")
                        .jobApp(jobApp)
                        .build();
            } else {
                return GetOneJobAppResponse.builder()
                        .errorMessage(ErrorMessages.OtherMessages.jobAppDoesnotExistError)
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .errorType(ErrorType.OTHER)
                        .jobApp(null)
                        .build();
            }

        } catch (NonExistantUserException | TokenExpiredException e) {
            return GetOneJobAppResponse.builder()
                    .jobApp(null)
                    .errorMessage(ErrorMessages.OtherMessages.tokenExpiredError)
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .errorType(ErrorType.TOKEN_EXPIRED)
                    .build();
        }
    }

    private AddJobAppResponse createErrorResponse(final HttpStatus status) {
        return AddJobAppResponse.builder()
                .errorMessage(ErrorMessages.AddJobAppMessages.unexpectedError)
                .statusCode(status.value())
                .errorType(ErrorType.OTHER)
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

    private GetJobAppsResponse createValidJobAppsResponse(final ArrayList<JobApplication> list) {
        return GetJobAppsResponse.builder()
                .jobApps(list)
                .statusCode(HttpStatus.OK.value())
                .errorType(ErrorType.NONE)
                .errorMessage("")
                .build();
    }
    public GetJobAppsResponse getAllJobApps(final String token) {
        try {
            final String username = validateUser(token);
            final ArrayList<JobApplication> jobApps = convertJobAppDataToJobApps(username);

            return createValidJobAppsResponse(jobApps);
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

    public EditJobAppResponse editJobApp(final EditJobAppRequest req) {
        try {
            final String username = validateUser(req.getToken());
            final UUID id = req.getUpdatedJobApp().getId();

            JobAppData jobAppData = getJobAppByIdAndUser(id, username);
            ArrayList<JobInterviewData> jobInterviews = getJobInterviews(id);

            final JobApplication updatedJobApp = req.getUpdatedJobApp();

            if (updatedJobApp.checkIfSavedJobAppIsEqual(jobAppData, jobInterviews, username)) {
                return createEditJobAppResponse(HttpStatus.OK.value(), ErrorType.NONE, "");
            }

            return saveJobApp(req.getUpdatedJobApp(), jobInterviews, username);
        } catch (TokenExpiredException | ExpiredJwtException e) {
            e.printStackTrace();
            return createEditJobAppResponse(HttpStatus.FORBIDDEN.value(),
                    ErrorType.TOKEN_EXPIRED, ErrorMessages.OtherMessages.tokenExpiredError);
        } catch (Exception e) {
            e.printStackTrace();
            return createEditJobAppResponse(HttpStatus.NOT_FOUND.value(),
                    ErrorType.OTHER, ErrorMessages.OtherMessages.unexpectedError);
        }
    }

    public JobAppData getJobAppByIdAndUser(final UUID id, final String creator) throws Exception {
        final Optional<JobAppData> jobApp = jobAppDataRepository
                .findByJobAppDataIdAndCreator(id, creator);

        if (jobApp.isPresent()) {
            return jobApp.get();
        } else {
            throw new Exception(ErrorMessages.OtherMessages.unexpectedError);
        }
    }

    public ArrayList<JobInterviewData> getJobInterviews(final UUID jobAppId) {
        return new ArrayList<>(jobInterviewDataRepository
                .findJobInterviewDataByJobAppId(jobAppId));
    }
    private EditJobAppResponse createEditJobAppResponse(int code, String errorType, String message) {
        return EditJobAppResponse.builder()
                .errorType(errorType)
                .errorMessage(message)
                .statusCode(code)
                .build();
    }

    private EditJobAppResponse saveJobApp(JobApplication jobApp,
                                          ArrayList<JobInterviewData> jobInterviews, final String creator) {
        final JobAppData newJobAppData = JobAppData.initFromJobApp(jobApp, creator);
        final ArrayList<UUID> idsToRemove = getIdsToRemove(jobInterviews, jobApp);
        final ArrayList<JobInterviewData> interviewsToAdd = getJobInterviewDataToAdd(jobInterviews
                , jobApp, idsToRemove);

        try  {
            jobAppDataRepository.save(newJobAppData);

            if (!idsToRemove.isEmpty()) {
                jobInterviewDataRepository.deleteAllById(idsToRemove);
            }

            if (!interviewsToAdd.isEmpty()) {
                jobInterviewDataRepository.saveAll(interviewsToAdd);
            }

            return createEditJobAppResponse(HttpStatus.OK.value(), ErrorType.NONE, "");
        } catch (Exception e) {
            e.printStackTrace();
            return createEditJobAppResponse(HttpStatus.FORBIDDEN.value(),
                    ErrorType.OTHER, ErrorMessages.OtherMessages.unexpectedError);
        }
    }

    private ArrayList<UUID> getIdsToRemove(ArrayList<JobInterviewData> list, JobApplication jobApp) {
        final HashSet<UUID> dataIds = initUUIDSetFromJobInterviewData(list);
        final HashSet<UUID> jobInterviewIds = initUUIDSetFromJobApp(jobApp);

        return getArrayOfRemainingIds(dataIds, jobInterviewIds);
    }

    private ArrayList<UUID> getArrayOfRemainingIds(HashSet<UUID> saveIds, final HashSet<UUID> newJobInterviews) {
        saveIds.removeAll(newJobInterviews);

        final UUID[] remainingIds = new UUID[saveIds.size()];
        final UUID[] remainingIds2 = saveIds.toArray(remainingIds);

        return new ArrayList<>(List.of(remainingIds2));
    }

    private HashSet<UUID> initUUIDSetFromJobInterviewData(final ArrayList<JobInterviewData> data) {
        HashSet<UUID> result = new HashSet<>();

        for (JobInterviewData i : data) {
            if (i.getId() != null && i.getJobAppId() != null) {
                result.add(i.getId());
            }
        }

        return result;
    }

    private HashSet<UUID> initUUIDSetFromJobApp(final JobApplication jobApp) {
        HashSet<UUID> result = new HashSet<>();

        for (JobInterview i : jobApp.getInterviews()) {
            if (i.getId() != null && i.getJobAppId() != null) {
                result.add(i.getId());
            }
        }

        return result;
    }
    private ArrayList<JobInterviewData> getJobInterviewDataToAdd(
            ArrayList<JobInterviewData> data, JobApplication jobApp, ArrayList<UUID> idsToRemove) {
        ArrayList<JobInterviewData> interviewsToAdd = new ArrayList<>();
        final HashSet<UUID> idsToRemoveSet = new HashSet<>(idsToRemove);
        HashSet<UUID> addedIds = new HashSet<>();
        final UUID jobAppId = jobApp.getId();

        for (JobInterview i : jobApp.getInterviews()) {
            if (!idsToRemoveSet.contains(i.getId())) {
                final JobInterviewData newJobInterview = createJobInterviewData(i, jobAppId);
                interviewsToAdd.add(newJobInterview);

                if (i.getId() != null) {
                    addedIds.add(i.getId());
                }
            }
        }

        for (JobInterviewData i : data) {
            if (shouldAddToAddInterviews(i.getId(), idsToRemoveSet, addedIds)) {
                interviewsToAdd.add(i);
            }
        }

        return interviewsToAdd;
    }

    private boolean shouldAddToAddInterviews(final UUID id, final HashSet<UUID> idsToRemove, final HashSet<UUID> addedIds) {
        return !idsToRemove.contains(id) && !addedIds.contains(id);
    }

    private JobInterviewData createOldJobInterviewData(JobInterview jobInterview, UUID jobAppId) {
        return JobInterviewData.initFromInterview(jobInterview, jobAppId);
    }

    private JobInterviewData createJobInterviewData(JobInterview jobInterview, UUID jobAppId) {
        return createOldJobInterviewData(jobInterview, jobAppId);
    }
    private ArrayList<JobApplication> convertJobAppDataToJobApps(final String username) {
        final ArrayList<JobAppData> data =
                new ArrayList<>(jobAppDataRepository.findByCreator(username));

        return SpringDataConverter.convertJobAppDataToJobApps(data);
    }
}
