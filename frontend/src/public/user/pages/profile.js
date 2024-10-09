import React, { useEffect, useState } from 'react';
import {Row,Col,Form,Input,Button,notification} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Title from 'antd/lib/typography/Title';
import LocalStorages from '../../../services/localStorages';

import { useDispatch } from 'react-redux';
import { updateRole } from '../../../services/store/Reducer';

import Header from '../components/header';
import '../allStyle.css';
function Profile() {
  const layout = {
      labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
      wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
  };
  const wrapSpan = {xs : 23, sm : 23, md : 23, lg : 14, xl : 14, xxl : 12};
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [fieldsInfo,setFieldsInfo] = useState([
    {name : ['email'],value : ''},
    {name : ['password'],value : ''},
    {name : ['confirm'],value : ''}
  ]);
  useEffect(() => {
    dataInfo();
  },[]);
  const dataInfo = async () => {
    await axios.get('user/person_info').then(res => {
      setFieldsInfo([
        {name : ['email'],value : res.data.email},
        {name : ['password'],value : ''},
        {name : ['confirm'],value : ''}
      ]);
    }
    ).catch(err => {
      notification.error({
        placement: 'bottomRight',
        message: `Call info fail status : ${err.response.status} Message : ${err.response.data.message}`
      });  
    });
  }
  const onFinish = values => {
    axios.patch('user/update_person_info',JSON.stringify(values)).then(
            res => {
                setFieldsInfo([
                  {name : ['email'],value : values.email},
                  {name : ['password'],value : ''},
                  {name : ['confirm'],value : ''}
                ]);
                LocalStorages.removeToken(['accessToken','refreshToken']);
                LocalStorages.setToken(res.data);
                dispatch(updateRole(res.data.typeRole));
                notification.success({
                    placement: 'bottomRight',
                    message: `Update person info successfully`
                });
            }
        ).catch(
            err => {
                notification.error({
                    placement: 'bottomRight',
                    message: `Update person info fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
    }
  return (
    <div>
      <Header />
      <Row justify="center">
        <Col span={22}>
            <Title level={4} className="Title">Personal Infomation</Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col className="card_bg" {...wrapSpan}>
          <Form
          {...layout}
            onFinish={onFinish}
            fields={fieldsInfo}
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
                            <Col span={10}><Button Click={() => navigate(-1)} className="Button button_link_style" htmlType="button" size="large" type="link">Go Back</Button></Col>
                            <Col span={14}><Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Change Person Info 
                            </Button></Col>
                        </Row>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
