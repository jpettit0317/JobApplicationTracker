package com.jpettit.jobapplicationbackend.models.responses;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jpettit.jobapplicationbackend.helpers.ObjectMapperHelper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetOneJobAppResponse implements JSONStringable {
    @Setter(AccessLevel.PRIVATE)
    private JobApplication jobApplication;

    @Override
    public String toJSONString() {
        try {
            return ObjectMapperHelper.createObjectMapper()
                    .writeValueAsString(this);
        } catch (JsonProcessingException ex) {
            return "";
        }
    }
}
