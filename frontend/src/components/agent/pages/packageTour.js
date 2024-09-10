import React,{useEffect} from 'react'
import { Button, Empty ,Row, Col} from 'antd'
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import getAgentPackage from '../../../services/store/agentThunks';

import Header from './header'
function PackageTour() {
  const dispatch = useDispatch();
  useEffect(() => {
    const dispatchGetAgentPackage = () => {
      dispatch(getAgentPackage())
    }
    dispatchGetAgentPackage()
  },[dispatch]);
  const {agentPackage} = useSelector((state) => state.AgentPackage) 
  const navigate = useNavigate();
  const toAddPackage = () => {
    navigate("/agent/add_package_tour")
  }
  const cardCol = { xs: 23, sm: 23, md: 23, lg: 14, xl: 14, xxl: 12 }
  return (
    <div>
      <Header/>
      <Row justify="space-around">
        <Col align="left">
          <Title level={2} className="Title">All Packages</Title>
        </Col>
        <Col align="rigth">
          <Button onClick={toAddPackage} className="Button button_style " type="primary" size="large" htmlType="button" style={{margin : "25px 0 0 0"}}><span style={{fontSize:"25px",padding:"0 0 5px 0"}}>+</span></Button>
        </Col>
      </Row>
      <Row justify="center">
        {!agentPackage ? (
            <Col className="card_bg" {...cardCol}><Empty /></Col>
        ) : (
            <div>{agentPackage}</div>
        )}
      </Row>
    </div>
  )
}

export default PackageTour
