import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col,Image,Empty  } from 'antd';
function BookingPaymentDetail(props) {
  const [payment,setPayment] = useState([]);
  useEffect(() => {
    const getPaymentDetail = async (id) => {
      try{
        if(id){
            const respone = await axios.get(`user/payment_detail/${id}`)
              .then(res => {
                return res.data;
              })
              .catch(err => {return []});
          setPayment(respone);
        }
      }catch{}
    };
    getPaymentDetail(props.arrDetail.bookingId);
  },[props.arrDetail.bookingId]);
  return (
    <div>{/*style={props.arrDetail.check ? null : {display : 'none'}} */}
    {payment ? (
        <Col>{payment.map(v => (v.id_paid))}</Col>
    ) : ( 
      <Col><Empty /></Col>
    )}
        
      
    </div>
  )
}

export default BookingPaymentDetail;
