package com.jpettit.jobapplicationbackend.helpers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.TimeZone;

public class DateToUTConverter {
    public static Date convertDateToUTCDate(final Date date,
                                            final String timezone, final String format) throws ParseException {
        final SimpleDateFormat sdf = new SimpleDateFormat(format);
        sdf.setTimeZone(TimeZone.getTimeZone(timezone));
        final String dateString = sdf.format(date);

        return sdf.parse(dateString);
    }
}
