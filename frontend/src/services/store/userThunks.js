import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import LocalStorages from '../localStorages';

const getAllBooking = createAsyncThunk('setAllBooking/getAllBooking',async () => {
    const token = LocalStorages.getToken();
    if(token.accessToken){
        const result = await axios.get("user/all_booking")
        .then(res => {return res.data;})
        .catch(err => {return err;});
        return result;
    }else{
        return null;
    }
});

export default getAllBooking;