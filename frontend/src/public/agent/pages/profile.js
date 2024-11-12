import React,{useState,useEffect} from 'react';
import axios from 'axios';

import {Row,Col,Tabs,notification} from 'antd';
import Title from 'antd/lib/typography/Title';

import Header from './header';
import AgentChangePassword from '../components/agentChangePassword';
import AgentProfileEdit from '../components/agentProfileEdit';
import '../allStyle.css';
function Profile() {
    const [dataProfile,setDataProfile] = useState([]);
    const getProfile = async () => {
        axios.get('agent/profile').then(res => {
            const result = res.data[0];
            if(result){
                setDataProfile(result);
            }
        }).catch(err => {
            notification.error({
                        placement: 'bottomRight',
                        message: `status : ${err.response.status} fail message : ${err.response.data.message}`
                    });
        });
    };
    const items = [
        {
            key: 'ChangePassword',
            label: 'Change Password',
            children: <AgentChangePassword dataProfile={dataProfile} getProfile={getProfile}/>,
        },
        {
            key: 'AgentProfileEdit',
            label: 'Edit Profile',
            children: <AgentProfileEdit dataProfile={dataProfile} getProfile={getProfile}/>,
        }
    ];
    useEffect(() => {
        getProfile();
    },[]);
    const onChange = (key) => {
        //console.log(key);
    };
  return (
    <div>
        <Header />
        <Row justify="center" >
            <Col span={22} offset={2} align='left'>
                <Title level={2} className="Title">Profile</Title>
            </Col>
            <Col className="card_bg fadeIn" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <Tabs defaultActiveKey="ChangePassword" type="card" items={items} onChange={onChange} />;
            </Col>
        </Row>
    </div>
  )
}

export default Profile
