export interface AddJobAppErrors {
    companyError: string,
    jobTitleError: string,
    descriptionError: string,
    statusError: string,
    dateAppliedError: string,

    isCompanyInErrorState: boolean,
    isJobTitleInErrorState: boolean,
    isDescriptionInErrorState: boolean,
    isStatusErrorInErrorState: boolean,
    isDateAppliedInErrorState: boolean
};