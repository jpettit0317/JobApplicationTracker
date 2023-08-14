import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";

export const compareStartDates = (interview1: JobInterview, interview2: JobInterview): number => {
    if (interview1.startDate === interview2.startDate) {
        return 0;
    } else if (interview1.startDate < interview2.startDate) {
        return -1;
    } else {
        return 1;
    }
};