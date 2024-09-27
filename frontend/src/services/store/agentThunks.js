import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import LocalStorages from '../localStorages';

const getPackage = createAsyncThunk("setAgentPackageTour/getPackage",async () => {
    const token = LocalStorages.getToken()
    if(token.accessToken){
        const all_package = await axios.get("agent/all_package")
        .then(res => {return res;})
        .catch(err => {return err.message;});
        return all_package;
    }else{
        console.log('no token !!');
    } 
});
const getAllBooking = createAsyncThunk('setAllBooking/getAllBooking',async () => {
    const token = LocalStorages.getToken();
    if(token.accessToken){
        const result = await axios.get("agent/all_booking")
        .then(res => {return res.data;})
        .catch(err => {return err;});
        return result;
    }else{
        return null;
    }
});
const permissions = {
    getPackage,
    getAllBooking
}

export default permissions;