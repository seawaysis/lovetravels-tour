import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import LocalStorages from '../../../services/localStorages';

import Upload from './upload';
function AgentProfileEdit(props) {
    const layout = {
        labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
        wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
    };
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const onFinish = values => {
        const body = {
            license: values.license,
            company: values.company,
            email: values.email,
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
        axios.post('agent/edit_profile',formData).then(
            res => {
                props.getProfile();
                setFileList([]);
                LocalStorages.setToken(res.data)
                notification.success({
                    placement: 'bottomRight',
                    message: `Edit profile successful`
                });
            }
        ).catch(
            err => {
                notification.error({
                    placement: 'bottomRight',
                    message: `Edit fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
    };
  return (
    <div style={{marginTop : '20px'}}>
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                        fields={[
                            {name : ["license"],value : props.dataProfile.license_id? props.dataProfile.license_id : ""},
                            {name : ["company"],value : props.dataProfile.company_name? props.dataProfile.company_name : ""},
                            {name : ["email"],value : props.dataProfile.email? props.dataProfile.email : ""},
                            {name : ["phone"],value : props.dataProfile.tel? props.dataProfile.tel : ""},
                        ]}
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
                         <Form.Item 
                            name="deletePic"
                            label="Current Pictures"
                            >
                        <img src={props.dataProfile.picPath} alt={props.dataProfile.company_name} style={{height:'100px',width:'100px'}} />
                        </Form.Item>
                        <Upload fileList={fileList} setFileList={setFileList} inputUpload={{formItem : {name:'payment',label:'QRcode Payment'},upload: {maxCount: 1}}} setNull={true}/>
                        <Row justify="end">
                            <Col span={5}><Button onClick={() => navigate(-1)} className="Button button_link_style" htmlType="button" size="large" type="link">Back</Button></Col>
                            <Col span={5}><Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Change
                            </Button></Col>
                        </Row>
                    </Form>
        </div>
    );
}

export default AgentProfileEdit
