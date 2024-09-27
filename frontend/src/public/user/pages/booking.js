import React,{useEffect} from 'react';
import {Row,Col,Divider,Empty} from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import Title from 'antd/lib/typography/Title';

import getAllBooking from '../../../services/store/userThunks';
import Header from '../components/header';
import formatMoney from '../formatMoney';
import '../allStyle.css';
const Booking = (props)=>{
    const dispatch = useDispatch();
    useEffect(() => {dispatch(getAllBooking())}, [dispatch]);
    const { allBooking } = useSelector((state) => state.AgentBooking);
    const wrapSpan = {xs : 23, sm : 23, md : 23, lg : 14, xl : 14, xxl : 12};
    
    const arrStatusTag = {
        pending : {class : 'tag_pending'},
        cancelled : {class : 'tag_cancelled'},
        confirmed : {class : 'tag_confirmed'},
        refunded : {class : 'tag_refunded'}
    };
    
    return (
    <div><Header />
    
    <Row justify="center">
        <Col span={22}>
            <Title level={4} className="Title">All Booking</Title>
        </Col>
    </Row>
    {!allBooking[0] ? (
        <Col className="card_bg" {...wrapSpan}><Empty /></Col>
    ) : ( allBooking.map((v) => ( 
    <Row justify="center">
        <Col className="card_bg" {...wrapSpan}>
            <Row>
                <Col span={12}><img src={v.pic_path} alt={v.package_name} style={{width : '100%',height:'150px'}}/></Col>
                <Col span={12}><span className="text_main">{v.package_name}</span><br /><span className="text_sub">{v.company_name}</span></Col>
            </Row>
            <Divider />
            <Row justify="end">
                <Col span={12}>
                    <div className={arrStatusTag[v.status].class}>{v.status}</div>
                </Col>
            </Row>
            <Row style={{textAlign: 'center'}}>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Check-In</span><br />
                        <span className="text_main">{v.check_in_date}</span>
                    </Col>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Check-Out</span><br />
                        <span className="text_main">{v.check_out_date}</span>
                    </Col>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Amount</span><br />
                        <span className="text_main">{v.amount}</span>
                    </Col>
            </Row>
            <Row justify="space-around" style={{marginTop : '20px'}}>
                <Col span={8} style={{textAlign: 'left'}}><span className="text_main">Price Per Person</span><br /><span className="price">{formatMoney(v.price_person)}</span></Col>
                <Col span={8} style={{textAlign: 'right'}}><span className="text_main">Sum Price</span><br /><span className="price_discount">{formatMoney(v.price_person*v.amount)}</span><br /><span className="price" style={{fontSize : '18px'}}>{formatMoney((v.price_person*v.amount)*v.discount/100)}</span><br /><span className="price_sum">{formatMoney((v.price_person*v.amount)-((v.price_person*v.amount)*v.discount/100))}</span><br /><span className="sub_description"> * text includes</span></Col>
            </Row>
        </Col>
    </Row>
    )))};
    </div>
);
}

export default Booking