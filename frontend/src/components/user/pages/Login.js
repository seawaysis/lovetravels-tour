import React from 'react';
import { Form, Input, Button, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from '../../../routers/axios';
import { useNavigate } from 'react-router-dom';

const layout = {
    labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 4, xxl: 3 },
    wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 20, xxl: 21 },
};

function Login(props) {
    const navigate = useNavigate();
    const onFinish = values => {
        const body = {
            email : values.email,
            pass : values.pass
        }
        axios.post("/user/login",body).then(res => {
            props.setRole("member");
                notification.success({
                    message: `Login successfully by ${values.username}`
                });
               navigate("user/search");
            }
        ).catch(
            res => {
                console.log('faill : '+res)
                notification.error({
                    message: `Register fail by ${res}`
                });
            }
        );
    };

    return (
        <Row justify="center">
            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div className="Form">
                    <Row justify="center">
                        <Title level={2} className="Title">
                            Login
                    </Title>
                    </Row>
                    <Divider className="Divider" />
                    <Form
                        className="App"
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="pass"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Button className="Button" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default Login