import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";

export interface JobAppCardProps {
    index: number;
    jobApp: JobApplication;
    onEdit: (index: number) => void;
    onView: (index: number) => void;
    onDelete: (index: number) => void;
}