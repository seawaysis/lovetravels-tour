import React from 'react';
import { Image,Empty,Table  } from 'antd';
import '../allStyle.css';
function BookingPaymentDetail(props) {
  const columns = [
  {
    title: 'Id',
    dataIndex: 'id_paid',
    key: 'id_paid',
    align : 'center',
    width : '20%'
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align : 'center',
    width : '20%'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align : 'center',
    width : '20%',
    render : (text) => text === 'successful' ? <p className="tag_payment_success">{text}</p> : <p className="tag_payment_fail">{text}</p>
  },
  {
    title: 'Paid at',
    dataIndex: 'paid_at',
    key: 'status',
    align : 'center',
    width : '20%',
    render : (text) => <p>{text.split('.')[0]}</p>
  },
  {
    title: 'Method',
    dataIndex: 'method',
    key: 'method',
    align : 'center',
    width : '10%'
  },
  {
    title: 'Pic Receipt',
    dataIndex: 'pic_receipt_path',
    key: 'pic_receipt_path',
    align : 'center',
    width : '10%',
    render: (pic) => pic ? <div><Image src={pic} alt="slip" width={50} height={60}/></div> : <p>-</p>,
  },
];
  return (
    <div>{/*style={props.arrDetail.check ? null : {display : 'none'}} */}
    {props.arrDetail ? (
      <Table style={{width : '100%'}} dataSource={props.arrDetail} columns={columns} pagination={false}/>
    ) : ( 
      <Empty />
    )}
    </div>
  )
}

export default BookingPaymentDetail;
