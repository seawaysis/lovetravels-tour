import React from 'react';
import { Col,Image,Empty  } from 'antd';
function BookingPaymentDetail(props) {
  return (
    <div>
    {!props.arrDetail.check ? (
        <Col><Empty /></Col>
    ) : ( 
        <Col>
        {props.arrDetail.bookingId}
        {/* <Image style={{marginTop : '20px',height: '200px'}} width={200}/> */}
        </Col>
    )}
        
      
    </div>
  )
}

export default BookingPaymentDetail;
