package com.jpettit.jobapplicationbackend.services;

import com.jpettit.jobapplicationbackend.enums.EnvironmentVars;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class EnvironmentService {

    private final Environment environment;

    @Autowired
    public EnvironmentService(final Environment environment) {
        this.environment = environment;
    }

    public String getEnvironmentVarOrDefault(final EnvironmentVars key, final String defaultValue) {
        return environment.getProperty(key.getValue(), defaultValue);
    }
}
