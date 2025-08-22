import axios from "axios"
import { BASE_URL } from "./apiPath"


const api = axios.create({
baseURL: BASE_URL,
timeout: 10000, 
headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
   
},
});

//Request Interceptor

api.interceptors.request.use(
    (config) => {
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

//response Interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if(error.response){
            if(error.response.status === 401){
                // Handle unauthorized access
                window.location.href = "/login"; // Redirect to login page
            } else if(error.response.status === 500){
                // Handle server error
                alert("Internal Server Error. Please try again later.");
            }
            else if(error.response.status === 404){
                alert("Resource not found.");
            }
        
            else if(error.code === "ECONNABORTED") {
                alert("Request timed out. Please try again.");
            }
            return Promise.reject(error);
        }
    }
);

export default api;