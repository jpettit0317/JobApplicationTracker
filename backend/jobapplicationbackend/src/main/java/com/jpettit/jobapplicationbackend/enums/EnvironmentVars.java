package com.jpettit.jobapplicationbackend.enums;

public enum EnvironmentVars {
    JOBAPP_DBUSER("JOBAPP_DBUSER"),
    JOBAPP_DBPASSWORD("JOBAPP_DBPASSWORD"),
    JOBAPP_SECRETKEY("JOBAPP_ENCRYPTKEY");

    private final String value;

    EnvironmentVars(String envVar) {
        this.value = envVar;
    }

    public String getValue() {
        return this.value;
    }
}
