import React from 'react';
import {Row,Col} from 'antd';
import Title from 'antd/lib/typography/Title';

import Header from '../pages/header';
const SumAccount = (req,res) => {
    return (
        <><Header />
        <Row justify="center">
            <Col span={22}>
                <Title level={4} className="Title">All Booking</Title>
            </Col>
        </Row>
        <Row justify="center">
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div className="Form">
                    test
                    </div>
            </Col>            
        </Row>
        </>
    );
} 
export default SumAccount;