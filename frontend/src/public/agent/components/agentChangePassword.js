import React from 'react';
import axios from 'axios';
import {Form, Input, Button, Row, Col,notification} from 'antd';

import { useNavigate } from 'react-router-dom';
function AgentChangePassword() {
    const layout = {
        labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
        wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
    };
    const navigate = useNavigate();
    const onFinish = values => {
        const body = {
            pass : values.password,
            conf_pass : values.conf_pass
        }
        axios.post('agent/change_password',body).then(
            res => {
                notification.success({
                    placement: 'bottomRight',
                    message: `Change password successful`
                });
            }
        ).catch(
            err => {
                notification.error({
                    placement: 'bottomRight',
                    message: `Change password fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
    }
  return (
    <div style={{marginTop : '20px'}}>
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >   
                        <Form.Item
                            name="password"
                            label="Password"
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
                            name="conf_pass"
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
                        <Row justify="end">
                            <Col span={5}><Button onClick={() => navigate(-1)} className="Button button_link_style" htmlType="button" size="large" type="link">Back</Button></Col>
                            <Col span={5}><Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Change
                            </Button></Col>
                        </Row>
                    </Form>
                </div>
  )
}

export default AgentChangePassword
