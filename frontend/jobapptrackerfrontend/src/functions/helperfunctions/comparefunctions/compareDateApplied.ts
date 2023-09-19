import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";

export const compareJobAppsDateAppliedDescending = (jobApp1: JobApplication, jobApp2: JobApplication): number => {
    if (jobApp1.dateApplied === jobApp2.dateApplied) {
        return 0;
    } else if (jobApp1.dateApplied > jobApp2.dateApplied) {
        return -1;
    } else {
        return 1;
    }
};