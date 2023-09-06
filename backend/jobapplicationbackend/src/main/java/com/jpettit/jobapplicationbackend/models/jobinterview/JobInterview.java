package com.jpettit.jobapplicationbackend.models.jobinterview;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobInterview {
    private UUID id;

    private UUID jobAppId;

    private String type;

    private String location;

    private Date startDate;

    private Date endDate;

    public String toJSONString() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(this);
    }
}
