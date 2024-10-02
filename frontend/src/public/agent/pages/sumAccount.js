import React, { useState } from 'react';
import {Row,Col,Form,Button,DatePicker,notification,Flex,Table} from 'antd';
import axios from 'axios';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';

import ConfigDate from '../configDate';
import Header from '../pages/header';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
  {
    title: 'Package',
    dataIndex: 'packageName',
  },
  {
    title: 'Amount',
    dataIndex: 'sumAmount',
  },
  {
    title: 'Price',
    dataIndex: 'sumPrice',
  },
  {
    title: 'Net Price',
    dataIndex: 'sumNetPrice',
  },
];
const pagesDataSource = Array.from({
  length: 2,
}).map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
function SumAccount (){
    const [rangeDate,setRangeDate] = useState({startDate : dayjs(),endDate : dayjs().add(1,'month')}); 
    const [dataSource,setDataSource] = useState([]);
    const onFinish = values => {
        const getDate = ConfigDate.adaptRangepickerDate(values.rangeDate);
        setRangeDate({startDate : dayjs(getDate.date.startDate,dateFormat),endDate : dayjs(getDate.date.endDate,dateFormat)});
        axios.post('agent/summary_account',getDate.date).then(
            res => {
                setDataSource(res.data);
                notification.success({
                    message: `Search successfully`
                });
            }
        ).catch(
            err => {
                notification.error({
                    message: `Search fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
    }
    return (
        <><Header />
        <Row justify="center">
            <Col span={22}>
                <Title level={4} className="Title">All Booking</Title>
            </Col>
        </Row>
        <Row justify="center">
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
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
        <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">

            </Flex>
            <Table /*rowSelection={rowSelection} */ columns={columns} dataSource={dataSource} />
        </Flex>
        </>
    );
} 
export default SumAccount;