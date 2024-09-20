import React from 'react';
import { Form, Input, Button, Flex, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from '../../../routers/axios';
import { useNavigate } from 'react-router-dom';
import LocalStorages from '../../../services/localStorages'

import '../allStyle.css';

const layout = {
    labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
    wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
function Register(props) {
    const navigate = useNavigate();
    const onFinish = values => {
        //console.log('Received values of form: ', values);
        const body = {
            email: values.email,
            pass: values.password,
            conf_pass: values.confirm
        }
        notification.warning({
                    message: `Register Progress`,
                    showProgress: true,
                });
        axios.post('user/register',body).then(
            res => {
                LocalStorages.removeToken('all')
                LocalStorages.setToken(res.data)
                notification.success({
                    message: `Register successfully by ${values.email}`
                });
               navigate("/user/confirm_email");
            }
        ).catch(
            err => {
                notification.error({
                    message: `Register fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
    };
    const toLogin = () => {
        navigate("/user/login");
    }

    return (
        <Row justify="center" >
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div className="Form">
                    <Flex justify="left">
                        <Title level={4} className="Title">Register</Title>
                    </Flex>
                    <Divider className="Divider" />
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="password"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                { min: 5, message: 'Password must be minimum 5 characters.' },
                                {
                                    pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/),
                                    message: 'The Password must have lowwerletter,upperletter,number least one',
                                }
                                
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            hasFeedback
                            dependencies={["password"]} //if password field change rules in confirm password will run again
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                { min: 5, message: 'Password must be minimum 5 characters.' },
                                {
                                    pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/),
                                    message: 'The Password must have lowwerletter,upperletter,number least one',
                                },({getFieldValue}) => ({ //{} noreturn | ({}) return obj
                                    validator(rule, value){
                                        if(!value || getFieldValue('password') === value){
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Confirm password must equal password")
                                    }
                                }) 
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Row style={{float: 'right'}}>
                            <Button onClick={toLogin} className="Button button_link_style" htmlType="button" size="large" type="link">Sign in</Button>
                            <Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Register
                            </Button>
                        </Row>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default Register;