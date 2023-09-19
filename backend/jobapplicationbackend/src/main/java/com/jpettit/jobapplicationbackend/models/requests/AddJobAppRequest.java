package com.jpettit.jobapplicationbackend.models.requests;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jpettit.jobapplicationbackend.helpers.ObjectMapperHelper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Builder
@AllArgsConstructor
@Data
public class AddJobAppRequest implements JSONStringable {
    private JobApplication jobApp;
    private String token;

    @Override
    public String toJSONString() {
        try {
            return ObjectMapperHelper.createObjectMapper()
                    .writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "";
        }
    }
}