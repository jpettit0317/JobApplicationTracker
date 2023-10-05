export enum APIEndPoint {
    addUser = "http://localhost:8080/api/v1/auth/register",
    loginUser = "http://localhost:8080/api/v1/auth/login",
    addJobApp = "http://localhost:8080/api/v1/main/addJobApp",
    getAllJobApps = "http://localhost:8080/api/v1/main/getAllJobApps",
    getNewJobApps = "http://localhost:8080/api/v1/main/getNewJobApps",
    deleteJobApp = "http://localhost:8080/api/v1/main/deleteJobApp",
    getJobAppById = "http://localhost:8080/api/v1/main/getJobAppById",
    editJobApp = "http://localhost:8080/api/v1/main/editJobApp" 
} 