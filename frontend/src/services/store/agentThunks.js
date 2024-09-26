import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import LocalStorages from '../localStorages';

const getPackage = createAsyncThunk("setAgentPackageTour/getPackage",async () => {
    const token = LocalStorages.getToken()
    if(token.accessToken){
        const all_package = await axios.get("agent/all_package")
        .then(res => {return res;})
        .catch(err => {return err.message;})
        return all_package;
    }else{
        console.log('no token !!');
    } 
})

export default getPackage;