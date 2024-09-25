import React from "react";
import {Row,Col, Button, Divider} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LocalStorages from '../../../services/localStorages';

import '../allStyle.css';

function PackageDetail(props) {
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.Roles); 
    const detail = props.packageDetail.dataDetail;
    const search = props.packageDetail.dataSearch;
    const arrSpan = [{xs:23, sm:23, md:23, lg:12, xl:12, xxl:8},{xs:8, sm:8, md:8, lg:8, xl:8, xxl:8}];
    const toPackageSearch = values => {
       props.setPackageDetail(prevDetail => ({
            ...prevDetail,
            dataDetail: { ...prevDetail.dataDetail, ...detail },
            dataSearch: { ...prevDetail.dataSearch, ...search },
            statusChange: !prevDetail.statusChange
        }));
    }
    const toPayment = (() => {
        LocalStorages.removeToken(["tempBooking"]);
        LocalStorages.setToken({tempBooking : JSON.stringify({dataSearch : search,dataDetail : detail})});
        if(role === 'member'){
            navigate("/user/payment");
        }else{
            navigate("/user/login");
        }
    });
    return (
        <>
        <Row justify="center">
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <Row style={{textAlign: 'center'}}>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Check-In</span><br />
                        <span className="text_main">{search.checkIn}</span>
                    </Col>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Check-Out</span><br />
                        <span className="text_main">{search.checkOut}</span>
                    </Col>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Amount</span><br />
                        <span className="text_main">{search.amount}</span>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={23} className="card_bg">
                    <Row justify="center">
                        {detail.pic_path.map((v,k) => (<Col {...arrSpan[0]}><img src={v} alt={detail.package_name} style={{width : '100%',height : '200px'}}/></Col>))}
                    </Row>
                    <Row justify="center">
                        <Col span={11} className="header_sub">
                            {detail.package_name}
                        </Col>
                        <Col span={11} className="header_sub" style={{textAlign: 'right'}}>
                            {detail.company_name}
                        </Col>
                        <Col span={22} className="text_sub">
                            {detail.description}
                        </Col>
                    </Row>
                <Divider />
                <Row justify="center">
                    <Col span={11} className="price">{detail.discount > 0 ? <div><span className="price_discount">{detail.price_person}</span><br /><span className="price_sum">THB {detail.price_person - (detail.price_person*detail.discount/100)}</span></div> : <div><span className="price_sum">{detail.price_person}</span></div>}<span style={{fontSize: '14px',color:'#888'}}>(per persons)</span></Col>
                    <Col span={11} style={{textAlign: 'right'}}><Button onClick={toPayment} className="Button button_style" size="large">Payment</Button></Col>
                </Row>
                <Button className="Button button_style" size="large" onClick={toPackageSearch} style={{marginTop : '20px'}}>Back to search</Button>
            </Col>
        </Row>
        </>
    );
}
export default PackageDetail;