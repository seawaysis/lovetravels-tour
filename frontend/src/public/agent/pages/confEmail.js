import React from 'react'
import { Form, Input, Button, Flex, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import LocalStorages from '../../../services/localStorages'
import { useNavigate } from 'react-router-dom';
import { updateRole } from '../../../services/store/Reducer'

import './allStyle.css';

const layout = {
    labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
    wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
function ConfEmail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = values => {
        const formData = new FormData()
        formData.append('otp',values.otp)
        axios.post("agent/confirm_email",formData)
        .then(res => {
            notification.success({
                    message: `confirm OTP successfully`
                });
            LocalStorages.removeToken('all')
            LocalStorages.setToken(res.data)
            dispatch(updateRole(res.data.typeRole))
            navigate("/agent/booking");
        }).catch(err => {
              notification.error({
                    message: `Register fail status : ${err.response.status} Message : ${err.response.data.message}`
                });  
        })
    }
    const onChange = (text) => {
        //console.log('onChange:', text);
        onFinish({otp : text})
    };
    const sharedProps = {
        onChange,
    };
    const resendOTP = () =>{
        notification.warning({
                    message: `Resend OTP Progress`,
                    showProgress: true,
                });
        axios.get("agent/resend_otp").then(res => {
            LocalStorages.removeToken('all')
            LocalStorages.setToken(res.data)
            notification.success({
                    message: `confirm OTP successfully`
                });
        }).catch(err => {
            notification.error({
                    message: `Resend fail status : ${err.response.status} Message : ${err.response.data.message}`
                });  
            if(err.response.status === 401){navigate("/agent/login");}
        })
    }
  return (
    <div>
      <Row justify="center" >
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <Flex justify="left">
                        <Title level={4} className="Title">Confirm Email OTP</Title>
                    </Flex>
                    <Divider className="Divider" />
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >   
                        <Form.Item
                            name="otp"
                            label="OTP"
                            rules={[
                                {
                                    required: true,
                                    message: 'OTP',
                                },{ 
                                    required: true, 
                                    message: "A value must be number",
                                    pattern: new RegExp(/^[0-9]+$/)
                                }
                            ]}
                        >
                        <Input.OTP length={8} {...sharedProps} />
                        </Form.Item>
                            <Row style={{float: 'right'}}>
                            <Button onClick={resendOTP} className="Button button_link_style" htmlType="button" size="large" type="link">  Resend OTP</Button>
                            <Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Confirm OTP
                            </Button>
                            </Row>
                    </Form>
            </Col>
        </Row>
    </div>
  )
}

export default ConfEmail
