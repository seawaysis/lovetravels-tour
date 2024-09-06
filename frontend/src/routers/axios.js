import axios from 'axios';
import LocalStorages from '../services/localStorages'
axios.defaults.baseURL = "http://localhost:8080/";

axios.interceptors.request.use(
    config => {
        const url = config.url.toLowerCase()
        const urlSplit = url.split('/')
        if(url.includes("user/search") || url.includes("user/detail")) return config
        const token = LocalStorages.getAllToken()
        const arrPath = {
            'user':[
                {'login' : {headers: {'Content-Type': 'application/json'}}},
                {'register' : {headers: {'Content-Type': 'application/json'}}},
                {'auth_token' : {headers: {Autherization : `Bearer ${token.refreshToken}`}}},
                {'resend_otp' : {headers: {Autherization : `Bearer ${token.confirmToken}`}}},
                {'confirm_email' : {headers: {Autherization : `Bearer ${token.confirmToken}`,'Content-Type': 'application/json'}}},
            ],
            'agent':[
                {'login' : {headers: {'Content-Type': 'application/json'}}},
                {'register' : {headers: {'Content-Type': 'multipart/form-data'}}},
                {'auth_token' : {headers: {Autherization : `Bearer ${token.refreshToken}`}}},
                {'resend_otp' : {headers: {Autherization : `Bearer ${token.confirmToken}`}}},
                {'confirm_email' : {headers: {Autherization : `Bearer ${token.confirmToken}`,'Content-Type': 'application/json'}}},
                {'add_package' : {headers: {Autherization : `Bearer ${token.refreshToken}`,'Content-Type': 'multipart/form-data'}}},
                {'booking' : {headers: {Autherization : `Bearer ${token.refreshToken}`}}},
            ]
        }
            arrPath[urlSplit[0]].forEach((v) => {
                if(v[urlSplit[1]]){
                    Object.keys(v[urlSplit[1]]).forEach(function(k) { 
                        if(k){
                            config[k] = v[urlSplit[1]][k]
                            // Object.keys(v[urlSplit[1]][k]).forEach(function(key) {
                            //     if(token && key){
                            //         config[k][key] = v[urlSplit[2]][k][key]
                            //     }
                            // });
                        }
                    });
                } 
            });
        return config
    },
    err => {
        Promise.reject(err)
    }
)

export default axios;