import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import LocalStorages from '../localStorages'

const getPackage = createAsyncThunk("setAgentPackageTour/getPackage",async () => {
    const token = LocalStorages.getToken()
    if(token.refreshToken){
        const auth_token = await axios.get("agent/all_package")
        .then(res => {console.log(res.data.typeRole); return res.data.typeRole})
        .catch(err => {return 'user'})
        return auth_token
    }else{
        console.log('no en setrole : ')
        return 'user'
    } 
})

export default getPackage;