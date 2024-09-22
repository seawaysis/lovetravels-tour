import React,{useState} from 'react';
import {Row,Col,Form,Input,InputNumber,Button,DatePicker, Empty, Divider} from 'antd'
import axios from 'axios';
//import moment from 'moment';

import {updatePackageSearch} from '../../../services/store/userPackageTourReducer';
import configDate from '../configDate';
function PackageSearch (props){
    const dateFormat = "YYYY-MM-DD";
    const [body,setBody] = useState({});
    const onFinish = values => {
        const getBody = {
            search : values.search ? values.search : null,
            checkIn : configDate.adaptpickerDate(values.checkIn),
            checkOut : configDate.adaptpickerDate(values.checkOut),
            amount : values.amount
        }
        setBody(prevBody => ({
            ...prevBody,...getBody
        }));
        refetch(getBody);
    }
    const refetch = async (body) => {
        if(body.checkIn){
        return await axios.post("user/search_package",body)
            .then(res => {props.dispatch(updatePackageSearch(res.data))})
            .catch(err => {return []});
        }
    };
    const toPackageDetail = values => {
       props.setPackageDetail(prevDetail => ({
            ...prevDetail,
            dataDetail: { ...prevDetail.dataDetail, ...values },
            dataSearch: { ...prevDetail.dataSearch, ...body },
            statusChange: !prevDetail.statusChange
        }));
    }
    return(
        <>
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
                                    <DatePicker format={dateFormat} style={{backgroundColor:'rgb(240, 240, 240)',width:'100%'}}/>
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
                                    {/* defaultValue={moment("2024-09-01",dateFormat)} */}
                                    <DatePicker format={dateFormat} style={{backgroundColor:'rgb(240, 240, 240)',width:'100%'}}/>
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
        <Row justify="center">
            {props.packageSearch.length <= 0 ? (
                <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                    <Empty />
                </Col>
            ) : (
                props.packageSearch.map((v,k) => (
                <Col onClick={() => toPackageDetail(props.packageSearch[k])} className="card_bg package_list" xs={23} sm={23} md={12} lg={8} xl={8} xxl={8}>
                    <Row>
                        <Col span={24}><img src={v.pic_path[0]} alt={v.package_name} style={{height: '250px',width: '100%'}}/></Col>
                    </Row>
                    <Row>
                        <Col span={16} className="header_sub">{v.package_name}</Col>
                        <Col span={8} className="header_sub" style={{textAlign: 'right'}}>{v.company_name}</Col>
                        <Col span={24} className="text_sub">{v.description}</Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24} className="price" style={{textAlign: 'right'}}>{v.discount > 0 ? <div><span style={{textDecorationLine : 'line-through'}}>{v.price_person}</span><br /><span className="price_sum">THB {v.price_person - (v.price_person*v.discount/100)}</span></div> : <div><span className="price_sum">{v.price_person}</span></div>}<span style={{fontSize: '14px',color:'#888'}}>(per persons)</span></Col>
                    </Row>
                    
                </Col>
                
            )))}
        </Row>
        </>
    );
}
export default PackageSearch;