import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import {Row,Col,Divider,Form,Button,notification} from "antd";
import axios from "axios";

import Upload from "../components/upload";
import '../allStyle.css';
function PaymentQrcodeForm (props) {
    console.log(props.items.dataDetail);
    const layout = {
        labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 4, xxl: 3 },
        wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 20, xxl: 21 },
    };
    const [fileList, setFileList] = useState([])
    //const navigate = useNavigate();
    const onFinish = values => {
        const body = {
            amount: props.items.dataSearch.amount,
            pricePerson: props.items.dataDetail.price_person,
            discount : props.items.dataDetail.discount,
            checkIn : props.items.dataSearch.checkIn,
            checkOut : props.items.dataSearch.checkOut,
            packageId : props.items.dataDetail.packageId
        }
        const formData = new FormData();
        Object.keys(body).forEach(key=>{
            formData.append(key, body[key])
        })
        for(let i=0;i < fileList.length;i++){
           formData.append('slip',fileList[i]);
        }
        axios.post('user/create_booking',formData).then(
            res => {
                notification.success({
                    message: `Booking successfully by`
                });
               //navigate("/user/booking");
            }
        ).catch(
            err => {
                notification.error({
                    message: `Booking fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
    };
    return (
        <>
            <img src={props.items.dataDetail.pic_payment} alt={props.items.dataDetail.company_name} style={{width : '100%'}}/>
            <Divider />
            <Form 
            {...layout}
            onFinish={onFinish}
            style={{ width: "100%" }}
            >
                <Upload setFileListFromRegis={setFileList} inputUpload={{formItem : {name:'slip',label:'E-slip'},upload: {maxCount: 1}}}/>

                <Row justify="end">
                            <Col span={12}><Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Send
                            </Button></Col>
                        </Row>
            </Form>
        </>
    );
}

export default PaymentQrcodeForm;