import React from 'react';
import {Row,Col,Form,Input,InputNumber,Button,DatePicker} from 'antd'
import axios from 'axios'

import Header from './header';
import configDate from '../configDate';
import './allStyle.css';

function Search(props) {
    const onFinish = values => {
        const body = {
            search : values.search ? values.search : null,
            checkIn : configDate.adaptpickerDate(values.checkIn),
            checkOut : configDate.adaptpickerDate(values.checkOut),
            amount : values.amount
        }
        axios.post("user/search_package",body).then(res => {

            }
        ).catch(
            err => {
            }
        );
    }
    return (
        <><Header/> 
        <Row justify="center">
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <Form
                        className="App"
                        span={24}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                        <span className="label_style">Search</span>
                        <Form.Item
                            name="search"
                            rules={[
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9ก-๛ ]*$/),
                                            message: 'Not allow special characters',
                                        }
                                    ]}
                        >
                            <Input placeholder="Where did you go ?"/>
                        </Form.Item>
                        <Row>
                            <Col span={11}>
                                <span className="label_style">Check in</span>
                                <Form.Item
                                    name="checkIn"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'require check in date',
                                        }
                                    ]}
                                >
                                    <DatePicker format="YYYY-MM-DD" style={{backgroundColor:'rgb(240, 240, 240)',width:'100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col span={11} offset={2}>
                                <span className="label_style">Check out</span>
                                <Form.Item
                                    name="checkOut"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'require check out date',
                                        }
                                    ]}
                                >
                                    <DatePicker format="YYYY-MM-DD" style={{backgroundColor:'rgb(240, 240, 240)',width:'100%'}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={11}>
                                <span className="label_style">Amount  adult</span>
                                <Form.Item
                                    name="amount"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input amount days trip',
                                        },
                                        {
                                            pattern: new RegExp(/^([0-9]{1,2})$/),
                                            message: 'The amount adult must number',
                                        }
                                    ]}
                                >
                                <InputNumber placeholder="Amount persons" style={{width:'100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col span={11} offset={2}>
                                <Button className="Button button_style" htmlType="submit" size="large" style={{marginTop:'23px'}}>
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
            </Col>
        </Row>
        </>
    )
}

export default Search