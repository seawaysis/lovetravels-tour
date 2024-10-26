import React from 'react';
import {Row,Col,Tabs} from 'antd';

import Header from './header';
import AgentChangePassword from '../components/agentChangePassword';
import AgentProfileEdit from '../components/agentProfileEdit';
function Profile() {
    const items = [
        {
            key: 'ChangePassword',
            label: 'Change Password',
            children: <AgentChangePassword />,
        },
        {
            key: 'AgentProfileEdit',
            label: 'Edit Profile',
            children: <AgentProfileEdit />,
        }
    ];
    const onChange = (key) => {
        console.log(key);
    };
  return (
    <div>
        <Header />
        <Row justify="center" >
            <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <Tabs defaultActiveKey="ChangePassword" type="card" items={items} onChange={onChange} />;
            </Col>
        </Row>
    </div>
  )
}

export default Profile
