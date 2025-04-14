import instance from "./axios";

export const loginRequest = data => instance.post(`/api/auth/login`,data,{
    withCredentials:true
})

export const registerReques = data => instance.post(`/api/auth/register`,data,{
    withCredentials: true
})