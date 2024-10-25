import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Flex, Row, Col, Divider,Upload, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import LocalStorages from '../../../services/localStorages';
import Header from '../pages/header';
function Profile() {
    const layout = {
        labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
        wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
    };
    const navigate = useNavigate();
    const [profile,setProfile] = useState([]);
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        getProfile();
    },[]);
    const getProfile = async () => {
        axios.get('agent/profile').then(res => {
            const result = res.data[0];
            if(result){
                setProfile([
                    {name : ["license"],value : result.license_id? result.license_id : ""},
                    {name : ["company"],value : result.company_name? result.company_name : ""},
                    {name : ["username"],value : result.username? result.username : ""},
                    {name : ["email"],value : result.email? result.email : ""},
                    {name : ["phone"],value : result.tel? result.tel : ""},
                ]);
            }
        }).catch(err => {
            notification.error({
                        placement: 'bottomRight',
                        message: `status : ${err.response.status} fail message : ${err.response.data.message}`
                    });
        });
    }
    const onFinish = values => {
        const body = {
            license: values.license,
            company: values.company,
            username: values.username,
            email: values.email,
            pass: values.password,
            conf_pass: values.conf_pass,
            phone: values.phone
        }
        const formData = new FormData();
        Object.keys(body).forEach(key=>{
            formData.append(key, body[key])
        })
        for(let i=0;i < fileList.length;i++){
           formData.append('payment',fileList[i])
        }
        notification.warning({
                    placement: 'bottomRight',
                    message: `Register Progress`,
                    showProgress: true,
                });
        axios.post('agent/register',formData,{ headers: { "Content-Type": "multipart/form-data" } }).then(
            res => {
                LocalStorages.setToken(res.data)
                notification.success({
                    placement: 'bottomRight',
                    message: `Change profile successful`
                });
               navigate("/agent/confirm_email");
            }
        ).catch(
            err => {
                notification.error({
                    placement: 'bottomRight',
                    message: `Change fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
    };
  return (
    <>
    <Header />
        <Row justify="center" >
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div className="Form">
                    <Flex justify="left">
                        <Title level={4} className="Title">Change Profile</Title>
                    </Flex>
                    <Divider className="Divider" />
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                        fields={profile}
                    >   
                        <Form.Item
                            name="license"
                            label="License ID"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your License ID!',
                                },
                                {
                                    pattern: new RegExp(/^[a-zA-Z0-9ก-๛_./\-=()* ]*$/),
                                    message: 'Not allow special characters',
                                }
                            ]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                            name="company"
                            label="Company Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Company Name!',
                                },
                                {
                                    pattern: new RegExp(/^[a-zA-Z0-9ก-๛_.\-=()* ]*$/),
                                    message: 'Not allow special characters',
                                }
                            ]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Username"
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
                            name="phone"
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Phone!',
                                },
                                {
                                    type: 'tel',
                                    message: 'The input is not valid Phone!',
                                },
                                {
                                    pattern: new RegExp(/^[0-9]{9,10}$/),
                                    message: 'The Phone must number only and have 9-10 characters',
                                }
                            ]}
                        >
                        <Input count={{
                                show: true,
                                min: 9,
                                max: 10,
                            }}/>
                        </Form.Item>
                        
                        <Upload fileList={fileList} setFileList={setFileList} inputUpload={{formItem : {name:'payment',label:'QRcode Payment'},upload: {maxCount: 1}}}/>
                        <Row justify="end">
                            <Col span={5}><Button onClick={() => navigate(-1)} className="Button button_link_style" htmlType="button" size="large" type="link">Back</Button></Col>
                            <Col span={5}><Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Register
                            </Button></Col>
                        </Row>
                    </Form>
                </div>
            </Col>
        </Row>
        </>
    );
}

export default Profile
