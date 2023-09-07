import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";
import { v4 as uuidv4 } from "uuid";

export const jobapp: JobApplication = {
    company: uuidv4(),
    jobTitle: uuidv4(),
    description: uuidv4(),
    status: uuidv4(),
    id: uuidv4(),
    dateApplied: new Date(),
    interviews: [],
    dateModified: new Date()
};