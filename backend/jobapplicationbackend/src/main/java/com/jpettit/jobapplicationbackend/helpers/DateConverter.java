package com.jpettit.jobapplicationbackend.helpers;

import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.TimeZone;

public class DateConverter {
    public static ZonedDateTime convertTimeStampToLocalDateTime(final String input) {
        final Instant instant = Instant.parse(input);
        final ZoneId utcZone = TimeZone.getTimeZone("UTC").toZoneId();

        return ZonedDateTime.ofInstant(instant, utcZone);
    }

    public static LocalDateTime convertDateToLocalTimezone(final LocalDateTime date,
                                                           final TimeZone defaultTimeZone) {
        final ZoneId from = ZoneId.of(JobAppTimeZone.UTC);
        final ZoneId timeZone = ZoneId.of(defaultTimeZone.getID());

        return date.atZone(from).withZoneSameInstant(timeZone).toLocalDateTime();
    }
}
