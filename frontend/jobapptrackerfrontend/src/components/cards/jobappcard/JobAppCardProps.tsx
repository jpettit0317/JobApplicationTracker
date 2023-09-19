import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";

export interface JobAppCardProps {
    index: number;
    jobApp: JobApplication;
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    onDelete: (id: string) => void;
}