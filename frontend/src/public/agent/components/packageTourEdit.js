import React, { useEffect, useState,useCallback } from 'react'
import { Form,Input,InputNumber,Button,Checkbox, Row, Col, notification,DatePicker} from 'antd'
import Title from 'antd/lib/typography/Title';
import axios from '../../../routers/axios';
import dayjs from 'dayjs';
//import LocalStorages from '../../../services/localStorages'

import ConfigDate from '../configDate';
import Upload from './upload';
import Header from '../pages/header';
import '../allStyle.css';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm';
const layout = {
    labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
    wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
const { TextArea } = Input;
function EditPackageTour(props) {
    const [fileList, setFileList] = useState([]);
    const [fields, setFields] = useState([]);
    const [picPath,setPicPath] = useState([]);
    const getEditPackageTour = useCallback(async () => {
        try {
            const res = await axios.get('agent/once_package/' + props.idForEdit);
            let checkboxPic = [];
            setFields([
                { name: ['packageName'], value: res.data.packageName },
                { name: ['description'], value: res.data.description },
                { name: ['daysTrip'], value: res.data.daysTrip},
                { name: ['maxPersons'], value: res.data.maxPersons},
                { name: ['price'], value: res.data.price},
                { name: ['priceDiscount'], value: res.data.priceDiscount},
                { name: ['rangeDate'], value: [dayjs(res.data.startDate, dateFormat),dayjs(res.data.endDate, dateFormat)]}
            ]);
            if(res.data.picPath.length > 0){
                res.data.picPath.forEach(v => {
                    checkboxPic.push({
                        label: <img src={v.fullPath} alt={res.data.packageName} style={{height:'100px',width:'100px'}} />,
                        value: v.namePic
                    });
                });
            }
            setPicPath(checkboxPic);
        } catch (err) {
            notification.error({
                placement: 'bottomRight',
                message: `Edit Package fail status : ${err.response?.status} Message : ${err.response?.data?.message || err.message}`,
            });
        }
    },[props.idForEdit]);
    useEffect(() => {
       getEditPackageTour();
    },[getEditPackageTour]);
  const onFinish = values => {
    const getDate = ConfigDate.adaptRangepickerDate(values.rangeDate);
    const body = {
            packageId : props.idForEdit,
            packageName: values.packageName,
            description: values.description,
            daysTrip: values.daysTrip,
            maxPersons: values.maxPersons,
            price: values.price,
            priceDiscount: values.priceDiscount,
            startDate: getDate.dateTime.startDate,
            endDate: getDate.dateTime.endDate,
            deletePic: values.deletePic
        }
        const formData = new FormData()
        Object.keys(body).forEach(key=>{
            formData.append(key, body[key])
        })
        for(let i=0;i < fileList.length;i++){
           formData.append('pic_package',fileList[i])
        }
        notification.warning({
                    placement: 'bottomRight',
                    message: `Edit Package Progress`,
                    showProgress: true,
                });

        axios.post('agent/edit_package',formData).then(
            res => {
                getEditPackageTour();
                setFileList([]);
                notification.success({
                    placement: 'bottomRight',
                    message: `Edit Package successfully`
                });
            }
        ).catch(
            err => {
                notification.error({
                    placement: 'bottomRight',
                    message: `Edit Package fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
  }
  const toPackage = () => {
        props.setView(null);
    }
  return (
    <div>
      <Header/>
      <Row justify="center">
        <Col span={22} offset={2} align='left'>
                        <Title level={2} className="Title">Edit Package Tour</Title>
                    </Col>
            <Col className="card_bg fadeIn" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div className="Form">
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                        fields={fields}
                    >   
                    <Form.Item
                            name="packageName"
                            label="Package Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your package Name!',
                                },
                                {
                                    pattern: new RegExp(/^[a-zA-Z0-9ก-๛_,.\-=()* ]*$/),
                                    message: 'Not allow special characters',
                                }
                            ]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                                {
                                    pattern: new RegExp(/^[a-zA-Z0-9ก-๛_,.\-=()* ]*$/),
                                    message: 'Not allow special characters',
                                }
                            ]}
                        >
                        <TextArea autoSize={{ minRows: 5, maxRows: 10 }} placeholder="maxLength is 200" maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            name="daysTrip"
                            label="Days Trip"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input amount days trip',
                                },
                                {
                                    pattern: new RegExp(/^[0-9]{1,2}$/),
                                    message: 'The amount days trip must number',
                                }
                            ]}
                        >
                        <InputNumber
                          min={0}
                          max={90}
                          style={{ width: "100%" }}/>
                        </Form.Item>
                        <Form.Item
                            name="maxPersons"
                            label="Max Persons"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input amount Max Persons',
                                },
                                {
                                    pattern: new RegExp(/^[0-9]{1,3}$/),
                                    message: 'The amount Max Persons must number',
                                }
                            ]}
                        >
                        <InputNumber
                          min={1}
                          max={1000}
                          style={{ width: "100%" }}/>
                        </Form.Item>
                      <Form.Item
                            name="price"
                            label="Price Per Person"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input amount price',
                                }
                            ]}
                        >
                        <InputNumber 
                          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                          decimalSeparator={2}
                          min={0}
                          max={1000000}
                          precision={2}
                          step={10}
                          style={{ width: "100%" }}
                        />
                        </Form.Item>
                        <Form.Item
                            name="priceDiscount"
                            label="Price Discount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input amount Price Discount',
                                },
                                {
                                    pattern: new RegExp(/^[0-9]{1,2}$/),
                                    message: 'The amount days trip must number',
                                }
                            ]}
                        >
                        <InputNumber 
                          min={0}
                          max={100}
                          style={{ width: "100%" }}/>
                        </Form.Item>
                        

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
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format={dateFormat}
                            minDate={dayjs(dayjs(), dateFormat)}
                            style={{backgroundColor:'lightgrey',width:'100%'}}
                            />
                        </Form.Item>
                         <Form.Item 
                            name="deletePic"
                            label="Current Pictures"
                            >
                        <Checkbox.Group options={picPath}/>
                        </Form.Item>
                        <Upload fileList={fileList} setFileList={setFileList} inputUpload={{formItem : {name:'pic_package',label:'Pictures Package'},upload: {maxCount: 5}}} setNull={true}/>
                        <Row justify="space-between" style={{float: 'right'}}>
                            <Col span={12}><Button onClick={toPackage} className="Button button_link_style" htmlType="button" size="large" type="link">package</Button></Col>
                            <Col span={10} offset={2}><Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Edit
                            </Button></Col>
                        </Row>
                    </Form>
                  </div>
              </Col>
            </Row>
    </div>
  )
}

export default EditPackageTour
