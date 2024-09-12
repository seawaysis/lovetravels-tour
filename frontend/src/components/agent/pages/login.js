import React from 'react';
import { Form, Input, Button, Flex, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from '../../../routers/axios';
import LocalStorages from '../../../services/localStorages'
import { useNavigate } from 'react-router-dom';

import {useDispatch} from 'react-redux'
import { updateRole } from '../../../services/store/Reducer'

 import './allStyle.css';
const layout = {
    labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 4, xxl: 3 },
    wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 20, xxl: 21 },
};

function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const onFinish = values => {
        const body = {
            user : values.user,
            pass : values.pass
        }
        axios.post("agent/login",body).then(res => {
            if(res.data.redirect){
                LocalStorages.setToken({confirmToken:res.data.confirmToken})
                navigate("/agent/confirm_email");
            }else{
                notification.success({
                    message: `Login successfully by ${values.user}`
                });
                LocalStorages.removeToken('all')
                LocalStorages.setToken(res.data)
                dispatch(updateRole(res.data.typeRole))
                navigate("agent/booking");
            }
            }
        ).catch(
            err => {
                console.log(err)
                notification.error({
                    message: `status : ${err.response.status} fail message : ${err.response.data.message}`
                });
            }
        );
    };
    const toRegis = () => {
        navigate("/agent/register");
    }
    const toSearch = () => {
        navigate("/user/search");
    }
    return (
        <div >
        <Row justify="center">
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div className="Form">
                    <Flex justify="left">
                        <Title level={4} className="Title">Login For Agent</Title>
                    </Flex>
                    <Divider className="Divider" />
                    <Form
                        className="App"
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            label="Username"
                            name="user"
                            type="text"
                            size="large"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                                { min: 5, message: 'Username must be minimum 5 characters.' },
                                { max: 15, message: 'Username must be maximum 15 characters.' },
                                {
                                    pattern: new RegExp(/^[a-zA-Z0-9_.-]*$/),
                                    message: 'The Usrename allow just characters and number only.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="pass"
                            size="large"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 5, message: 'Username must be minimum 5 characters.' },
                                {
                                    pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/),
                                    message: 'The Password must have lowwerletter,upperletter,number least once.',
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Flex gap="middle" justify="end" horizontal style={{}}>
                            <Col span={5}><Button onClick={toRegis} className="Button button_link_style" htmlType="button" type="link" size="large">Sign up</Button></Col>
                            <Col span={5}><Button className="Button button_style" htmlType="submit" size="large">Login</Button></Col>
                        </Flex>
                    </Form>
                </div>
                <Divider
                    variant="dotted"
                    style={{
                        borderColor: 'gray'
                    }}
                    >
                    <span style={{fontSize:'14px',fontWeight:'regular',color:'gray'}}>OR</span>
                </Divider>
                <Row justify='center'>
                    <Col span={7}><Button className="Button button_style" htmlType="button" size="large" style={{margin : '0px 5px'}} onClick={toSearch}>Find Package Tour</Button></Col>
                </Row>
            </Col>
        </Row>
        </div>
    );
}

export default Login