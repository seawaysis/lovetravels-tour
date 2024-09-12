import React from 'react';
import {Row,Col,Form,Input,InputNumber,Button,DatePicker} from 'antd'

import Header from './header';
import './allStyle.css';

function Search(props) {
    const onFinish = values => {
        console.log(values)
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
                        <Form.Item
                            name="search"
                            type="text"
                        >
                            <span className="label_style">Search</span>
                            <Input placeholder="Where did you go ?"/>
                        </Form.Item>
                        <Row>
                            <Col span={11}>
                                <Form.Item
                                    name="checkin"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'require check in date',
                                        },
                                        {
                                            pattern: new RegExp(/^\d{4}-\d{2}-\d{2}$/),
                                            message: 'Invalid format check in date',
                                        }
                                    ]}
                                >
                                    <span className="label_style">Check in</span>
                                    <DatePicker style={{backgroundColor:'rgb(240, 240, 240)',width:'100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col span={11} offset={2}>
                                <Form.Item
                                    name="checkout"
                                    rules={[
                                        {
                                            pattern: new RegExp(/^\d{4}-\d{2}-\d{2}$/),
                                            message: 'Invalid format check in date',
                                        }
                                    ]}
                                >
                                    <span className="label_style">Check out</span>
                                    <DatePicker style={{backgroundColor:'rgb(240, 240, 240)',width:'100%'}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={11}>
                                <Form.Item
                                    name="amount"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input amount days trip',
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]{1,2}$/),
                                            message: 'The amount days trip must number',
                                        }
                                    ]}
                                >
                                <span className="label_style">Amount</span>
                                <InputNumber
                                min={0}
                                max={90}
                                style={{ width: "100%" }}/>
                                </Form.Item>
                            </Col>
                            <Col span={11} offset={2}>
                                <Button className="Button button_style " style={{marginTop:'25px'}} type="primary" size="large" htmlType="submit">
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