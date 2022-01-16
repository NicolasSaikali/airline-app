import axios, { AxiosInstance } from "axios";

export const HttpService = axios.create({
    baseURL : 'http://localhost:8080',
})

HttpService.interceptors.request.use((req)=>{
    console.log(`${req.method}/ ${req.baseURL}/${req.url}`)
    return req;
})

// HttpService.interceptors.response.use((res)=>{
//     console.log(`response ${JSON.stringify(res.data)}`)
//     return res;
// })
