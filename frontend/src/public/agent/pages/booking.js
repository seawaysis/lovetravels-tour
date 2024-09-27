import React,{useEffect} from 'react';
import {Row,Col,Divider,Empty,Button,notification} from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';

import agentThunks from '../../../services/store/agentThunks';
import formatMoney from '../formatMoney';
import Header from './header';
import '../allStyle.css';
const Booking = ()=>{
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(agentThunks.getAllBooking());
    }, [dispatch]);
    const { allBooking } = useSelector((state) => state.AgentBooking);
    const wrapSpan = {xs : 23, sm : 23, md : 23, lg : 14, xl : 14, xxl : 12};
    
    const arrStatusTag = {
        pending : {class : 'tag_pending'},
        cancelled : {class : 'tag_cancelled'},
        confirmed : {class : 'tag_confirmed'},
        refunded : {class : 'tag_refunded'}
    };
    const statusChange = (values) => {
        axios.post('agent/change_status_booking',values).then(res => {
            dispatch(agentThunks.getAllBooking());
             notification.success({
                    message: `Change status ${values.id} successfully !!`
                });
        }).catch(err => {
                console.log(err)
                notification.error({
                    message: `status : ${err.response.status} fail message : ${err.response.data.message}`
                });
            }
        );
    }
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
            <Row justify="space-around">
                <Col span={12}><span className="text_main">{v.email}</span><br /><span className="text_sub">{v.package_name}</span></Col>
                <Col span={8}><div className={arrStatusTag[v.status].class}>{v.status}</div></Col>
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
                <Col span={8} style={{textAlign: 'left'}}><span className="text_main">Price Per Person</span><br /><span className="price">{formatMoney(v.price_person)}</span></Col>
                <Col span={8} style={{textAlign: 'right'}}><span className="text_main">Sum Price</span><br /><span className="price_discount">{formatMoney(v.price_person*v.amount)}</span><br /><span className="price" style={{fontSize : '18px'}}>{formatMoney((v.price_person*v.amount)*v.discount/100)}</span><br /><span className="price_sum">{formatMoney((v.price_person*v.amount)-((v.price_person*v.amount)*v.discount/100))}</span><br /><span className="sub_description"> * text includes</span></Col>
            </Row>
            <Divider />
            {v.status === 'pending' ? <Row justify="space-around"><Col span={10}><Button onClick={() => statusChange({ status : "cancelled",id : v.booking_id})} className="Button button_delete" htmlType="button" size="large">Cancel</Button></Col><Col span={10}><Button onClick={() => statusChange({ status : "confirmed",id : v.booking_id})} className="Button button_success" htmlType="button" size="large">Confirm</Button></Col></Row> : null}
            {v.status === 'confirmed' ? <Row justify="space-around"><Col span={10}><Button onClick={() => statusChange({ status : "refunded",id : v.booking_id})} className="Button button_refund" htmlType="button" size="large">Refund</Button></Col><Col span={10}><Button onClick={() => statusChange({ status : "pending",id : v.booking_id})} className="Button button_delete" htmlType="button" size="large">Pending</Button></Col></Row> : null}
            {v.status === 'refunded' ? <Row justify="space-around"><Col span={10}><Button onClick={() => statusChange({ status : "cancelled",id : v.booking_id})} className="Button button_delete" htmlType="button" size="large">Cancel</Button></Col><Col span={10}><Button onClick={() => statusChange({ status : "confirmed",id : v.booking_id})} className="Button button_success" htmlType="button" size="large">Confirm</Button></Col></Row> : null}
            {v.status === 'cancelled' ? <Row justify="space-around"><Col span={7}><Button onClick={() => statusChange({ status : "refunded",id : v.booking_id})} className="Button button_refund" htmlType="button" size="large">Refund</Button></Col><Col span={7}><Button onClick={() => statusChange({ status : "confirmed",id : v.booking_id})} className="Button button_success" htmlType="button" size="large">Confirm</Button></Col><Col span={7}><Button onClick={() => statusChange({ status : "pending",id : v.booking_id})} className="Button button_delete" htmlType="button" size="large">Pending</Button></Col></Row> : null}
        </Col>
    </Row>
    )))};
    </div>
);
}

export default Booking