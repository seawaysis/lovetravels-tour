import React, { useState } from 'react'
import { Form,Input,InputNumber,Button, Row, Col, notification,DatePicker} from 'antd'
import Title from 'antd/lib/typography/Title';
import axios from '../../../routers/axios';
import { useNavigate } from 'react-router-dom';
//import LocalStorages from '../../../services/localStorages'

import ConfigDate from '../configDate'
import Upload from './upload'
import Header from './header'
import '../allStyle.css';

const { RangePicker } = DatePicker;
const layout = {
    labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
    wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
const { TextArea } = Input;
function AddPackageTour() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([])
  const onFinish = values => {
    //console.log(new Date(values.rangeDate[0]['$d']).toISOString().split('T')[0])
    const getDate = ConfigDate.adaptRangepickerDate(values.rangeDate)
    const body = {
            packageName: values.packageName,
            description: values.description,
            daysTrip: values.daysTrip,
            maxPersons: values.maxPersons,
            price: values.price,
            priceDiscount: values.priceDiscount,
            startDate: getDate.startDate,
            endDate: getDate.endDate
        }
        
        const formData = new FormData()
        Object.keys(body).forEach(key=>{
            formData.append(key, body[key])
        })
        for(let i=0;i < fileList.length;i++){
           formData.append('pic_package',fileList[i])
        }
        notification.warning({
                    message: `Add Package Progress`,
                    showProgress: true,
                });

        axios.post('agent/add_package',formData).then(
            res => {
                console.log(res)
                notification.success({
                    message: `Add Package successfully`
                });
               navigate("/agent/package_tour");
            }
        ).catch(
            err => {
                console.log(err)
                // notification.error({
                //     message: `Add Package fail status : ${err.response.status} Message : ${err.response.data.message}`
                // });
            }
        );
  }
  const toPackage = () => {
        navigate("/agent/package_tour");
    }
  return (
    <div>
      <Header/>
      <Row justify="center">
        <Col span={22} offset={2} align='left'>
                        <Title level={2} className="Title">Add Package Tour</Title>
                    </Col>
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div className="Form">
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >   
                    <Form.Item
                            name="packageName"
                            label="package Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your package Name!',
                                },
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
                            ]}
                        >
                        <TextArea rows={4} placeholder="maxLength is 200" maxLength={200} />
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
                            label="startDate - endDate"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input amount Price Discount',
                                }
                            ]}
                        >
                        <RangePicker
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format={'YYYY/MM/DD HH:mm'}
                            style={{backgroundColor:'rgb(240, 240, 240)',width:'100%'}}
                            />
                        </Form.Item>


                        <Upload setFileListFromRegis={setFileList} inputUpload={{formItem : {name:'pic_package',label:'Pictures Package'},upload: {maxCount: 5}}}/>
                        <Row style={{float: 'right'}}>
                            <Button onClick={toPackage} className="Button button_link_style" htmlType="button" size="large" type="link">package</Button>
                            <Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Add
                            </Button>
                        </Row>
                    </Form>
                  </div>
              </Col>
            </Row>
    </div>
  )
}

export default AddPackageTour
