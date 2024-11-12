import React, { useState } from 'react';
import {Row,Col,Form,Button,DatePicker,notification,Flex,Table} from 'antd';
import axios from 'axios';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';

import ConfigDate from '../configDate';
import Header from '../pages/header';

import formatMoney from '../formatMoney';
import '../allStyle.css';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
function SumAccount (){
    const [rangeDate,setRangeDate] = useState({startDate : dayjs(),endDate : dayjs().add(1,'month')}); 
    const [dataSource,setDataSource] = useState([]);
    const onFinish = values => {
        const getDate = ConfigDate.adaptRangepickerDate(values.rangeDate);
        setRangeDate({startDate : dayjs(getDate.date.startDate,dateFormat),endDate : dayjs(getDate.date.endDate,dateFormat)});
        axios.post('agent/summary_account',getDate.date).then(
            res => {
                console.log(res.data);
                setDataSource(res.data);
                notification.success({
                    placement: 'bottomRight',
                    message: `Search successfully`
                });
            }
        ).catch(
            err => {
                notification.error({
                    placement: 'bottomRight',
                    message: `Search fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
    }
    const columns = [
        {
            title: 'Package',
            dataIndex: 'packageName',
        },
        {
            title: 'Amount',
            dataIndex: 'sumAmount',
            align: 'center'
        },
        {
            title: 'Price',
            dataIndex: 'sumPrice',
            align: 'center',
            render: text => formatMoney(text)
        },
        {
            title: 'Net Price',
            dataIndex: 'sumNetPrice',
            align: 'center',
            render: text => formatMoney(text)
        },
    ];
    const subColumns = [
        {
            title: 'booking Id',
            dataIndex: 'bookingId',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            align: 'center',
            render: text => formatMoney(text)
        },
        {
            title: 'Net Price',
            dataIndex: 'netPrice',
            align: 'center',
            render: text => formatMoney(text)
        }
    ];
const expandedRow = row => {
return <Table columns={subColumns} dataSource={row.detail} pagination={false} />;
};
const onRow = (record, rowIndex) => {
                return {
                onClick: event => {
                    console.log(record);
                    }, // click row
                };
            }
    return (
        <><Header />
        <Row justify="center">
            <Col span={22}>
                <Title level={4} className="Title">All Booking</Title>
            </Col>
        </Row>
        <Row justify="center">
            <Col className="card_bg fadeIn" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <Form
                        className="App"
                        span={24}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                        fields={[
                            {
                                name : ["rangeDate"],
                                value : [rangeDate.startDate? rangeDate.startDate : dayjs(),rangeDate.endDate? rangeDate.endDate : dayjs()]
                            }
                        ]}
                    >
                        <Row>
                        <Col span={17}>
                    <Form.Item
                            name="rangeDate"
                            label="Start Date - End Date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Range Date',
                                }
                            ]}
                        >
                        <RangePicker
                            format={dateFormat}
                            defaultValue={[dayjs(dayjs(), dateFormat), dayjs(dayjs().add(1,'month'), dateFormat)]}
                            style={{backgroundColor:'lightgrey',width:'100%'}}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={6} offset={1}>
                                <Button className="Button button_style" htmlType="submit" size="large" style={{marginTop:'40px', height : '50px'}}>
                                    Search
                                </Button>
                            </Col>
                            </Row>
                        </Form>
            </Col>            
        </Row>
        <Flex className="fadeIn" gap="middle" vertical>
            <Flex align="center" gap="middle">

            </Flex>
            <Table /*rowSelection={rowSelection} */ columns={columns} expandedRowRender={expandedRow} dataSource={dataSource} pagination={{ defaultPageSize: 1, showSizeChanger: true, pageSizeOptions: ['1', '10'], locale: {items_per_page: "package / page"}}} /*onRow={onRow}*/ bordered/>
        </Flex>
        </>
    );
} 
export default SumAccount;