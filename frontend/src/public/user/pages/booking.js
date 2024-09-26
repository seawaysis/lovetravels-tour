import React from 'react';
import {Row,Col,Divider,Tag} from 'antd';
import Title from 'antd/lib/typography/Title';

import Header from '../components/header';
import formatMoney from '../formatMoney';

const Booking = (props)=>{
    const wrapSpan = {xs : 23, sm : 23, md : 23, lg : 14, xl : 14, xxl : 12};
    const items = {
        dataDetail : {
            company_name : 'test',
            package_name : `tests`,
            price_person : 1000,
            discount : 5, 
            status : 'pendding',
            pic_path : ['http://localhost:8080/public/images/package_tour']
        },dataSearch : {
            checkIn : '2024-09-16',
            checkOut : '2024-09-18',
            amount : 2,
        }
    };
    const arrPrice = {
        price : items.dataDetail.price_person*items.dataSearch.amount,
        discountPrice : (items.dataDetail.price_person*items.dataSearch.amount)*items.dataDetail.discount/100,
        netPrice : (items.dataDetail.price_person*items.dataSearch.amount)-((items.dataDetail.price_person*items.dataSearch.amount)*items.dataDetail.discount/100)
    }
    const arrStatusTag = {
        pendding : {class : 'tag_pending'},
    };
    return (
    <div><Header />
    
    <Row justify="center">
        <Col span={22}>
            <Title level={4} className="Title">All Booking</Title>
        </Col>
    </Row>
    <Row justify="center">
        <Col className="card_bg" {...wrapSpan}>
            <Row>
                <Col span={12}><img src={items.dataDetail.pic_path[0]} alt={items.dataDetail.package_name} style={{width : '100%',height:'150px'}}/></Col>
                <Col span={12}><span className="text_main">{items.dataDetail.package_name}</span><br /><span className="text_sub">{items.dataDetail.company_name}</span></Col>
            </Row>
            <Divider />
            <Row justify="end">
                <Col span={8}>
                    <div className={arrStatusTag[items.dataDetail.status].class}>{items.dataDetail.status}</div>
                </Col>
            </Row>
            <Row style={{textAlign: 'center'}}>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Check-In</span><br />
                        <span className="text_main">{items.dataSearch.checkIn}</span>
                    </Col>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Check-Out</span><br />
                        <span className="text_main">{items.dataSearch.checkOut}</span>
                    </Col>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Amount</span><br />
                        <span className="text_main">{items.dataSearch.amount}</span>
                    </Col>
            </Row>
            <Row justify="space-around" style={{marginTop : '20px'}}>
                <Col span={8} style={{textAlign: 'left'}}><span className="text_main">Price Per Person</span><br /><span className="price">{formatMoney(items.dataDetail.price_person)}</span></Col>
                <Col span={8} style={{textAlign: 'right'}}><span className="text_main">Sum Price</span><br /><span className="price_discount">{formatMoney(arrPrice.price)}</span><br /><span className="price" style={{fontSize : '18px'}}>{formatMoney(arrPrice.discountPrice)}</span><br /><span className="price_sum">{formatMoney(arrPrice.netPrice)}</span><br /><span className="sub_description"> * text includes</span></Col>
            </Row>
        </Col>
    </Row>
    </div>
);
}

export default Booking