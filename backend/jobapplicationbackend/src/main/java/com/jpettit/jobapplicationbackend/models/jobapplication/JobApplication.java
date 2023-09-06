package com.jpettit.jobapplicationbackend.models.jobapplication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.helpers.DateToUTConverter;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.staticVars.DateFormats;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import jakarta.persistence.*;
import lombok.*;

import java.text.ParseException;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobApplication {
    private String company;
    private String jobTitle;
    private String description;
    private String status;

    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    private Date dateApplied;

    private Date dateModified;
    private ArrayList<JobInterview> interviews;

    public String toJSONString() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(this);
    }

    public boolean isJobAppValid() {
        if (this.getInterviews().isEmpty()) {
            return true;
        }
        return validateJobInterviews();
    }

    private boolean validateJobInterviews() {
        final ArrayList<JobInterview> jobInterviews = getInterviews();

        try {
            final Date dateApplied = DateToUTConverter.convertDateToUTCDate(getDateApplied(), JobAppTimeZone.UTC,
                    DateFormats.standardFormat);

            for (JobInterview jobInterview : jobInterviews) {
                final Date jobInterviewStartDate = DateToUTConverter.convertDateToUTCDate(
                        jobInterview.getStartDate(), JobAppTimeZone.UTC, DateFormats.standardFormat);

                if (jobInterviewStartDate.before(dateApplied)) {
                    return false;
                }
            }
            return true;
        } catch (ParseException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
            return false;
        }
    }
}
