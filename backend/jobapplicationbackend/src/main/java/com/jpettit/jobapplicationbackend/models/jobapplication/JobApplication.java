package com.jpettit.jobapplicationbackend.models.jobapplication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.helpers.DateToUTConverter;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.staticVars.DateFormats;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import jakarta.persistence.*;
import lombok.*;

import java.text.ParseException;
import java.time.LocalDateTime;
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
}
