import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Form,Input,Button, Row, Col,notification} from 'antd';

import formatMoney from '../formatMoney';

let OmiseCard
function PaymentCreditCard(props) {
    useEffect(() => {
      OmiseCard = handleLoadScript();
    },[]);
    const handleLoadScript = () => {
      const script = document.createElement('script');
        script.src = 'https://cdn.omise.co/omise.js';
        script.async = true;
        document.getElementsByTagName('body')[0].appendChild(script);
        OmiseCard = window.OmiseCard;
        return OmiseCard;
    }
    // const creditCardConfigure = async () => {
    //   if(OmiseCard === undefined)OmiseCard = await handleLoadScript();
    //   OmiseCard.configure({
    //     publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
    //           currency: 'THB',
    //           frameLabel: 'LoveTravels',
    //           submitLabel: 'Pay NOW',
    //           buttonLabel: 'Pay with Omise',
    //       defaultPaymentMethod: 'credit_card',
    //       otherPaymentMethods: []
    //   });
    //     OmiseCard.configureButton("#credit-card");
    //     OmiseCard.attach();
    //     addCart();
    // }
    // const addCart = () => {
    //   OmiseCard.open({
    //    frameDescription : props.items.dataDetail.package_name,
    //    amount : props.arrPrice.netPrice * 100,
    //    onCreateTokenSuccess: (token) => {
    //     console.log(token)
    //    },
    //    onFormClosed: () => {}
    //   });
    // }

    const layout = {
      labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
      wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
  };
const onFinish = async(values) => {
    const dataBooking = {
        booking : {
            netPrice : props.arrPrice.netPrice,
            amount : props.items.dataSearch.amount,
            pricePerson : props.items.dataDetail.price_person,
            discount : props.items.dataDetail.discount,
            checkIn : props.items.dataSearch.checkIn,
            checkOut : props.items.dataSearch.checkOut,
            packageId : props.items.dataDetail.packageId
        },
        payment : {
            cardNumber : values.cardNumber,
            holderName : values.holderName,
            cvv : values.cvv,
        }
    };
    console.log(JSON.stringify(dataBooking));
    axios.post("user/pay_credit_card",JSON.stringify(dataBooking)).then(
            res => {
                notification.success({
                    placement: 'bottomRight',
                    message: `Payment successfully`
                });
               //navigate("/agent/package_tour");
            }
        ).catch(
            err => {
                notification.error({
                    placement: 'bottomRight',
                    message: `Payment fail status : ${err.response.status} Message : ${err.response.data.message}`
                });
            }
        );
}
 return (
    // <div className="own-form">
    //     <form>
    //         <Button
    //             id="credit-card"
    //             type="button"
    //             onClick={(() => creditCardConfigure())}
    //             >
    //             ชำระเงินด้วยบัตรเครดิต
    //         </Button>
    //     </form>
    // </div>
    <>
    <Row justify="center">
        <Col span={22}>
        <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >   
            <Form.Item
                            name="cardNumber"
                            label="Credit card"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your credit card!',
                                },
                                {
                                    pattern: new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/),
                                    message: 'Not allow special characters',
                                }
                            ]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item
                            name="holderName"
                            label="Holder Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Holder Name',
                                },
                                {
                                    pattern: new RegExp(/^[a-zA-Z0-9ก-๛.\- ]*$/),
                                    message: 'Not allow special characters',
                                }
                            ]}
                        >
                        <Input />
                        </Form.Item>
                        <Row justify="space-around">
                          <Col span={15} md={15}>
                            <Form.Item
                                name="expireCard"
                                label="Expird Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Expird Date Card',
                                    },
                                    {
                                        pattern: new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
                                        message: 'Not allow special characters',
                                    }
                                ]}
                                
                            >
                            <Input maxLength={5} style={{width: '90%',float : 'right'}}/>
                            </Form.Item>
                          </Col>
                          <Col span={9} md={9}>
                            <Form.Item
                                name="cvv"
                                label="CVV"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your CVV',
                                    },
                                    {
                                        pattern: new RegExp(/^[0-9]{1,3}$/),
                                        message: 'Not allow special characters',
                                    }
                                ]}
                            >
                            <Input maxLength={3} style={{width: '100%'}}/>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row justify="space-between" style={{float: 'right'}}>
                            <Col span={24}><Button className="Button button_style " type="primary" size="large" htmlType="submit">
                                Sum Price {formatMoney(props.arrPrice.netPrice)} With Pay
                            </Button></Col>
                        </Row>
        </Form>
      </Col>
    </Row>
    </>
  );
}

export default PaymentCreditCard
