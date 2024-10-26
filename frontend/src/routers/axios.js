import axios from 'axios';
import LocalStorages from '../services/localStorages';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8080/";

axios.interceptors.request.use(
    config => {
        const url = config.url.toLowerCase();
        const urlSplit = url.split('/');
        if(url.includes("user/search") || url.includes("user/detail")) return config
        const token = LocalStorages.getAllToken();
        const arrPath = {
            'user':[
                {'login' : {headers: {'Content-Type': 'application/json'}}},
                {'register' : {headers: {'Content-Type': 'application/json'}}},
                {'search_package' : {headers: {'Content-Type': 'application/json'}}},
                {'all_booking' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'payment_detail' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'auth_token' : {headers: {authorization : `Bearer ${token.refreshToken}`}}},
                {'resend_otp' : {headers: {authorization : `Bearer ${token.confirmToken}`}}},
                {'confirm_email' : {headers: {authorization : `Bearer ${token.confirmToken}`,'Content-Type': 'application/json'}}},
                {'person_info' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'update_person_info' : {headers: {authorization : `Bearer ${token.accessToken}`,'Content-Type': 'application/json'}}},
                {'pay_eslip' : {headers: {authorization : `Bearer ${token.accessToken}`,'Content-Type': 'multipart/form-data'}}},
                {'pay_credit_card' : {headers: {authorization : `Bearer ${token.accessToken}`,'Content-Type': 'application/json'}}},
            ],
            'agent':[
                {'login' : {headers: {'Content-Type': 'application/json'}}},
                {'register' : {headers: {'Content-Type': 'multipart/form-data'}}},
                {'profile' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'change_password' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'edit_profile' : {headers: {authorization : `Bearer ${token.accessToken}`,'Content-Type': 'multipart/form-data'}}},
                {'auth_token' : {headers: {authorization : `Bearer ${token.refreshToken}`}}},
                {'resend_otp' : {headers: {authorization : `Bearer ${token.confirmToken}`}}},
                {'confirm_email' : {headers: {authorization : `Bearer ${token.confirmToken}`,'Content-Type': 'application/json'}}},
                {'add_package' : {headers: {authorization : `Bearer ${token.accessToken}`,'Content-Type': 'multipart/form-data'}}},
                {'all_package' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'once_package' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'edit_package' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'all_booking' : {headers: {authorization : `Bearer ${token.accessToken}`}}},
                {'change_status_booking' : {headers: {authorization : `Bearer ${token.accessToken}`,'Content-Type': 'application/json'}}},
                {'change_status_package' : {headers: {authorization : `Bearer ${token.accessToken}`,'Content-Type': 'application/json'}}},
                {'summary_account' : {headers: {authorization : `Bearer ${token.accessToken}`,'Content-Type': 'application/json'}}},
                {'agent_info' : {headers: {authorization : `Bearer ${token.confirmToken}`,'Content-Type': 'application/json'}}},
            ]
        }
            arrPath[urlSplit[0]].forEach((v) => {
                if(v[urlSplit[1]]){
                    Object.keys(v[urlSplit[1]]).forEach(function(k) { 
                        if(k){
                            config[k] = v[urlSplit[1]][k]
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
// axios.interceptors.response.use(
//     response => {
//         return response;
//     }
// )
export default axios;