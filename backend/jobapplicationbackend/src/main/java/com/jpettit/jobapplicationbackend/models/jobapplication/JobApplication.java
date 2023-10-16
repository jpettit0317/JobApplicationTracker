package com.jpettit.jobapplicationbackend.models.jobapplication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import lombok.*;

import java.time.ZonedDateTime;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobApplication implements JSONStringable {
    private String company;
    private String jobTitle;
    private String description;
    private String status;

    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    private ZonedDateTime dateApplied;

    private ZonedDateTime dateModified;
    private ArrayList<JobInterview> interviews;

    public String toJSONString() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "";
        }
    }

    public boolean isJobAppValid() {
        if (this.getInterviews().isEmpty()) {
            return true;
        }
        return validateJobInterviews();
    }

    private boolean validateJobInterviews() {
        final ArrayList<JobInterview> jobInterviews = getInterviews();

        for (JobInterview jobInterview : jobInterviews) {
            if (jobInterview.getStartDate().isBefore(getDateApplied())) {
                return false;
            }
        }
        return true;
    }

    public boolean checkIfSavedJobAppIsEqual(JobAppData jobAppData,
                                             ArrayList<JobInterviewData> jobInterviews,
                                             String creator) {
        HashMap<UUID, JobInterviewData> data = createMap(jobInterviews);
        return checkIfJobAppDataIsEqual(jobAppData, creator) && checkIfJobInterviewsAreEqual(data, jobInterviews);
    }

    private boolean checkIfJobAppDataIsEqual(JobAppData jobAppData, String creator) {
        if (!getCompany().equals(jobAppData.getCompany())) {
            return false;
        }

        if (!getJobTitle().equals(jobAppData.getJobTitle())) {
            return false;
        }

        if (!getDescription().equals(jobAppData.getDescription())) {
            return false;
        }

        if (!creator.equals(jobAppData.getCreator())) {
            return false;
        }

        if (!dateApplied.equals(jobAppData.getDateApplied())) {
            return false;
        }

        return getId().equals(jobAppData.getJobAppDataId());
    }

    private boolean checkIfJobInterviewsAreEqual(HashMap<UUID, JobInterviewData> savedInterviews,
                                                 ArrayList<JobInterviewData> data) {
        for (JobInterviewData i : data) {
            final JobInterviewData savedInterview = savedInterviews.get(i.getId());

            if (!isJobInterviewEqual(savedInterview, i)) {
                return false;
            }
        }
        return true;
    }

    private boolean isJobInterviewEqual(JobInterviewData saved, JobInterviewData newData) {
       if (!saved.getJobAppId().equals(newData.getJobAppId())) {
           return false;
       }

       if (!saved.getId().equals(newData.getId())) {
           return false;
       }

       if (!saved.getType().equals(newData.getType())) {
           return false;
       }

       if (!saved.getLocation().equals(newData.getLocation())) {
           return false;
       }

       if (!saved.getStartDate().equals(newData.getStartDate())) {
           return false;
       }

        return saved.getEndDate().equals(newData.getEndDate());
    }
    public HashMap<UUID, JobInterviewData> createMap(ArrayList<JobInterviewData> jobInterviews) {
        HashMap<UUID, JobInterviewData> map = new HashMap<>();

        for (JobInterviewData i : jobInterviews) {
            map.put(i.getId(), i);
        }

        return map;
    }
}
