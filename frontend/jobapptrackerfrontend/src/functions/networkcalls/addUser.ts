import { error } from "console";
import { HttpResponse, HttpResponseBuilder } from "../../model/httpresponses/HttpResponse";
import { SignUp } from "../../model/interfaces/signup/SignUp";
import axios from "axios";

export const addUser = async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => {
    return new Promise((resolve, reject) => {
        axios.post<string>(url, signUp).then((res) => {
          resolve(
            new HttpResponseBuilder<string>(res.data)
                .setErrorMessage("")
                .setStatusCode(res.status)
                .build()
          );
        })
        .catch((err) => {
          console.log("Fetch Error!!!", err);
          return new HttpResponseBuilder<string>("")
            .setErrorMessage(err.message)
            .setStatusCode(404)
            .build();
        });
    }); 
}