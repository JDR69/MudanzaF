import instance from "./axios";

export const loginRequest = user => instance.post(`/login`,user,{
    withCredentials:true
})