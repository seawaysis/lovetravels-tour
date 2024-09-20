import React,{useState} from 'react';
import { Drawer,Menu,Flex,Divider,notification } from 'antd';
// import Title from 'antd/lib/typography/Title';
// import axios from '../../../routers/axios';
import LocalStorages from '../../../services/localStorages'
import { useNavigate } from 'react-router-dom';
import {MenuOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux'
import { updateRole } from '../../../services/store/Reducer'
import './allStyle.css';

function Header(props) {
    const [openMenu,setOpenMenu] = useState(false);
    return (
        <div>
            <Flex gap="middle" justify="space-between" horizontal style={{backgroundColor:'#7BBCB0'}}  className="iconMenu">
                <div className='bg_color' style={{fontSize:'20px',padding:'10px 0 0 10px',marginBottom:"20px"}}>LoveTravels</div>
                <div><MenuOutlined style={{color:'white',fontSize:'25px',padding:'15px 20px 0 0'}} onClick={() =>{setOpenMenu(true)}}/></div>
            </Flex>
            <span className="headerMenu">
                <AppMenu />
            </span>
            <Drawer 
            style={{backgroundColor:"#7BBCB0",color:"white"}}
            placement='left'
            open={openMenu}
            onClose={()=>{
                setOpenMenu(false)
            }} 
            closable={false} >
                <AppMenu isInline/>
            </Drawer>
        </div>
        )
}
function AppMenu({isInline=false}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Logout = () => {
        LocalStorages.removeToken('all');
        console.log('test')
        dispatch(updateRole('user'))
        notification.success({
                    message: `Logout successfully !!`
                });
        navigate("/agent/login");
    };
    let items = [
                    {
                        label:"Booking",
                        key: "booking",
                        style: {color:"white"}
                    },{
                        label:"Acount",
                        key: "account",
                        style: {color:"white"}
                    },{
                        label:"Package Tour",
                        key: "package_tour",
                        style: {color:"white"}
                    },{
                        label:"logout",
                        key: "logout",
                        style: {color:"white"}
                    }
                ];
    let styleForMenu = {}
    if(isInline){
        styleForMenu = {backgroundColor:"#7BBCB0",float: 'left'}
    }else{
        styleForMenu = {backgroundColor:"#7BBCB0",float: 'right',width:'380px'}
    }
    return (
        <div style={{backgroundColor:"#7BBCB0",overflow: 'auto'}}>
            <div className='bg_color' style={{fontSize:'20px',padding:'8px 0 0 10px',marginBottom:"20px",float:'left'}}>LoveTravels</div>
            <div className="iconMenu">
            <Divider
                variant="dotted"
                style={{
                    borderColor: 'white'
                }}
                >
                <span style={{fontSize:'14px',fontWeight:'regular',color:'white'}}>MENU</span>
            </Divider>
            </div>
            <Menu
                style={styleForMenu}
                mode={isInline ? "inline" : "horizontal"}
                items={items}
                onClick={(e) => {
                    if(e.key === 'logout'){
                        Logout()
                    }else{
                        navigate("/agent/"+e.key);
                    }
                }}
            >
            </Menu>
        </div>
    );
}
export default Header