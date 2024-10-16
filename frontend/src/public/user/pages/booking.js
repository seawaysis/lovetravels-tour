import React,{useEffect} from 'react';
import {Row,Col,Image,Divider,Empty} from 'antd';
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
    console.log(allBooking);
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
                <Col span={11}><img src={v.pic_path} alt={v.package_name} style={{width : '100%',height:'150px'}}/></Col>
                <Col span={12} offset={1}><span className="text_main">{v.package_name}</span><br /><span className="text_sub">{v.company_name}</span><br /><div className={arrStatusTag[v.status].class} style={{margin:'10px 0'}}>{v.status}</div></Col>
            </Row>
            <Divider />
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
                <Col span={8} style={{textAlign: 'left'}}><span className="text_main">Price Per Person</span><br /><span className="price">{formatMoney(v.price_person)}</span><Image style={{marginTop : '20px',height: '200px'}} width={200} src={v.pic_receipt_path}/></Col>
                <Col span={8} style={{textAlign: 'right'}}><span className="text_main">Sum Price</span><br /><span className="price_discount">{formatMoney(v.price_person*v.amount)}</span><br /><span className="price" style={{fontSize : '18px'}}>{formatMoney((v.price_person*v.amount)*v.discount/100)}</span><br /><span className="price_sum">{formatMoney((v.price_person*v.amount)-((v.price_person*v.amount)*v.discount/100))}</span><br /><span className="sub_description"> * text includes</span></Col>
            </Row>
        </Col>
    </Row>
    )))};
    </div>
);
}

export default Booking