import React,{useEffect} from 'react';
import { Button, Empty ,Row, Col,Divider} from 'antd';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import agentThunks from '../../../services/store/agentThunks';

import Header from './header';
import formatMoney from '../formatMoney';
import '../allStyle.css';
function PackageTour() {
  const dispatch = useDispatch();
  useEffect(() => {
    const dispatchGetAgentPackage = () => {
      dispatch(agentThunks.getPackage());
    }
    dispatchGetAgentPackage();
  },[dispatch]);
  const {agentPackage} = useSelector((state) => state.AgentPackage);
  const navigate = useNavigate();
  const toAddPackage = () => {
    navigate("/agent/add_package_tour");
  }
  const cardCol = { xs: 23, sm: 23, md: 23, lg: 14, xl: 14, xxl: 12 }
  return (
    <div>
      <Header/>
      <Row justify="space-around">
        <Col span={10} offset={2} >
          <Title level={2} className="Title">All Packages</Title>
        </Col>
        <Col span={3} offset={4} >
          <Button onClick={toAddPackage} className="Button button_style " type="primary" size="large" htmlType="button" style={{margin : "25px 0 0 0"}}><span style={{fontSize:"25px",padding:"0 0 5px 0"}}>+</span></Button>
        </Col>
      </Row>
      <Row justify="center">
        {agentPackage.lenght <= 0 ?  (
            <Col className="card_bg" {...cardCol}><Empty /></Col>
        ) : ( 
            agentPackage.map((v,k) => (
              <Col className="card_bg" {...cardCol}>
                <Row>
                  <Col span={11} offset={1}>
                    <img src={v.pic_url} style={{height: '250px',width: '100%'}} alt=''/>
                  </Col>
                  <Col span={11} offset={1}>
                    <h2>{v.package_name}</h2>
                    <p>{v.description}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={10} offset={2}>
                    <div className='header_sub'>Start Date : <br /><span className='value_style'>{v.start_date}</span></div>
                  </Col>
                  <Col span={10} offset={2} >
                    <div className='header_sub'>End Date : <br /><span className='value_style'>{v.end_date}</span></div>
                  </Col>
                  <Col span={9} offset={2} >
                    <div className='header_sub'>Price Per Person : <span className='price'>{formatMoney(v.price_person)}</span> Baht</div>
                  </Col>
                  <Col span={5} offset={1} >
                    <div className='header_sub'>discount : <span className='value_style'>{v.discount}</span> %</div>
                  </Col>
                  <Col span={6} offset={1} >
                    <div className='header_sub'>Net Price : <span className='price_sum'>{formatMoney(parseInt(v.price_person) - (parseFloat(v.price_person)*parseInt(v.discount)/100))}</span> Baht</div>
                  </Col>
                  <Col span={10} offset={2}>
                    <div className='header_sub'>Days Trip : <span className='value_style'>{v.days_trip}</span> Days</div>
                  </Col>
                  <Col span={10} offset={2}>
                    <div className='header_sub'>Max Capacity Persons : <span className='value_style'>{formatMoney(v.max_amount)}</span></div>
                  </Col>
                </Row>
                <Divider className="Divider" />
                <Row>
                  <Col span={10} offset={1}>{v.status === 'active' ? <Button className='button_delete' type='button'>Close</Button> : <Button className='button_success' type='button'>Open</Button>}</Col>
                  <Col span={10} offset={1}><Button className='button_success' type='button'>Edit</Button></Col>
                </Row>
              </Col>
            ))
        )}
      </Row>
    </div>
  )
}

export default PackageTour
