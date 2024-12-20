import React, { useEffect, useState } from 'react';
import { Row,Col,Table,notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';

import Header from '../pages/header';
import '../allStyle.css';
function Log() {
  const columns = [
  {
    title: 'task',
    dataIndex: 'task',
    key: 'task',
  },
  {
    title: 'ip_address',
    dataIndex: 'ip_address',
    key: 'ip_address',
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];
  const [dataLog,setDataLog] = useState([]);
  useEffect(() => {
    getAllLog();
  },[]);
  const getAllLog = async () => {
    axios.get("agent/all_task_log").then(res => {
      setDataLog(res.data);
      }).catch(err => {
        notification.error({
          placement: 'bottomRight',
          message: `status : ${err.response.status} fail message : ${err.response.data.message}`
      });
    });
  }
  return (
    <div>
      <Header />
      <Row justify="center">
            <Col span={20} offset={2} >
                <Title level={2} className="Title">Log</Title>
            </Col>
      </Row>
      <Row justify="center">
        <Col className="card_bg fadeIn" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
          <Table dataSource={dataLog} columns={columns} />
        </Col>
      </Row>
    </div>
  )
}

export default Log
