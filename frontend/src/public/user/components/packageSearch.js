import React,{useEffect, useState} from 'react';
import {Row,Col,Form,Input,InputNumber,Button,DatePicker, Empty, Divider,notification} from 'antd'
import axios from 'axios';
import dayjs from 'dayjs';

import localStorage from '../../../services/localStorages';
import {updatePackageSearch} from '../../../services/store/userPackageTourReducer';
import configDate from '../configDate';
import formatMoney from '../formatMoney';

function PackageSearch (props){
    const dateFormat = "YYYY-MM-DD";
    const tempBooking = localStorage.getToken('tempBooking');
    const [body,setBody] = useState({});
    const [fieldsSearch,setFieldsSearch] = useState([]);
    const [bgSearch,setBgSearch] = useState([]);
    useEffect(() => {
        if(tempBooking.tempBooking){
            const result = JSON.parse(tempBooking.tempBooking);
            setDataSearch(result.dataSearch);
            defaultSearch('bg');
        }else{ 
            defaultSearch('full');
        }
    },[]);
    const defaultSearch = async (status) => {
        await axios.get("user/default_search")
            .then(res => {
                if(status === 'full'){
                    const firstSearch = {
                        search : res.data.search,
                        checkIn : res.data.checkIn,
                        checkOut : res.data.checkOut,
                        amount : res.data.amount
                    };
                    setFieldsSearch([
                                {name : ["search"],value : props.dataSearch.search? props.dataSearch.search : firstSearch.search},
                                {name : ["checkIn"],value : props.dataSearch.checkIn ? dayjs(props.dataSearch.checkIn,dateFormat) : dayjs(firstSearch.checkIn,dateFormat)},
                                {name : ["checkOut"],value : props.dataSearch.checkOut ? dayjs(props.dataSearch.checkOut,dateFormat) : dayjs(firstSearch.checkOut,dateFormat)},
                                {name : ["amount"],value : props.dataSearch.amount? props.dataSearch.amount : firstSearch.amount}
                            ]);
                    setBody(prevBody => ({
                        ...prevBody,...firstSearch
                    }));
                    refetch(firstSearch);
                }
                changeBg(res.data.bgSearch);
            })
            .catch(err => {});
    }
    const onFinish = values => {
        const getBody = {
            search : values.search ? values.search : null,
            checkIn : configDate.adaptpickerDate(values.checkIn),
            checkOut : configDate.adaptpickerDate(values.checkOut),
            amount : values.amount
        }
        setDataSearch(getBody);
    }
    const setDataSearch = (dataSearch) => {
            setFieldsSearch([
                                {name : ["search"],value : dataSearch.search},
                                {name : ["checkIn"],value : dayjs(dataSearch.checkIn,dateFormat)},
                                {name : ["checkOut"],value : dayjs(dataSearch.checkOut,dateFormat)},
                                {name : ["amount"],value : dataSearch.amount}
                            ]);
            setBody(prevBody => ({
                ...prevBody,...dataSearch
            }));
            refetch(dataSearch);
    }

    const refetch = async (body) => {
        if(body.checkIn){
        return await axios.post("user/search_package",body)
            .then(res => {
                props.dispatch(updatePackageSearch(res.data));
                notification.success({
                    placement: 'bottomRight',
                    message: `Search successfully`
                });
            })
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
    const changeBg = (arrBg) => {
        setBgSearch({
            position: 'absolute',
            zIndex: '-1',
            background: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(${arrBg[Math.round(Math.random() * ((arrBg.length -1) - 0) + 0)]}) center center`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100%',
            height: '40%',
            animation: 'fadeIn 2s'
           });
    }
    return(
        <div class="fadeIn">
        <div style={bgSearch}>
        </div>
        <Row justify="center">
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <Form
                        className="App"
                        span={24}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                        fields={fieldsSearch}
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
                                    <DatePicker format={dateFormat} minDate={dayjs(dayjs(), dateFormat)} style={{backgroundColor:'lightgray',width:'100%'}}/>
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
                                    <DatePicker format={dateFormat} minDate={dayjs(dayjs(), dateFormat)} style={{backgroundColor:'lightgray',width:'100%'}}/>
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
        <Row justify="space-around">
            {!props.packageSearch[0] ? (
                <Col className="card_bg fadeIn" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                    <Empty />
                </Col>
            ) : (
                props.packageSearch.map((v,k) => (
                <Col onClick={() => toPackageDetail(props.packageSearch[k])} className="card_bg package_list fadeIn" xs={23} sm={23} md={12} lg={8} xl={8} xxl={8}>
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
                        <Col span={24} className="price" style={{textAlign: 'right'}}>{v.discount > 0 ? <div><span style={{textDecorationLine : 'line-through'}}>{formatMoney(v.price_person)}</span><br /><span className="price_sum">THB {formatMoney(v.price_person - (v.price_person*v.discount/100))}</span></div> : <div><span className="price_sum">{formatMoney(v.price_person)}</span></div>}<span style={{fontSize: '14px',color:'#888'}}>(per persons)</span></Col>
                    </Row>
                    
                </Col>
                
            )))}
        </Row>
    </div>
    );
}
export default PackageSearch;