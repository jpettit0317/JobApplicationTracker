package com.jpettit.jobapplicationbackend.models.requests;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Builder
@AllArgsConstructor
@Data
public class AddJobAppRequest {
    private JobApplication jobApp;
    private String token;

    public String toJSONString() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }
}