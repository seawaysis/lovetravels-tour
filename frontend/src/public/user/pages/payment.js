import React,{ useState} from "react";
import {Row,Col, Divider} from 'antd'
import LocalStorages from '../../../services/localStorages';

import Header from '../components/header';
import '../allStyle.css';

function Confirm_payment () {
    const setDetail = () => {
        const result = LocalStorages.getToken('tempBooking');
        return result.tempBooking ? JSON.parse(result.tempBooking) : null;
    }
    const [items, setItems] = useState(setDetail());
    //     const result = setDetail();
    //     setItems(prevItems => ({
    //         ...prevItems,...JSON.parse(result.tempBooking)
    //     }));
    return (<>
    <Header />
    <Row>
        <Col className="card_bg" xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
            <Row>
                <Col span={12}><img src={items.dataDetail.pic_path[0]} alt={items.dataDetail.package_name} style={{width : '100%',height:'150px'}}/></Col>
                <Col span={12}><span className="text_main">{items.dataDetail.package_name}</span><br /><span className="text_sub">{items.dataDetail.company_name}</span></Col>
            </Row>
            <Divider />
            {/* <Row>
                <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Check-In</span><br />
                        <span className="text_main">{items.dataSearch.checkIn}</span>
                    </Col>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Check-Out</span><br />
                        <span className="text_main">{items.dataSearch.checkOut}</span>
                    </Col>
                    <Col span={8}>
                        <span className="text_sub" style={{fontWeight : 'normal'}}>Amount</span><br />
                        <span className="text_main">{items.dataSearch.amount}</span>
                    </Col>
            </Row> */}
        </Col>
    </Row>

    </>);
}

export default Confirm_payment;

// {
//     "tempBooking": "{\"dataSearch\":{\"search\":null,\"checkIn\":\"2024-09-22\",\"checkOut\":\"2024-09-24\",\"amount\":3},\"dataDetail\":{\"package_name\":\"เกาะล้าน (Koh Lan Pattaya)\",\"description\":\"เป็นแขวงหนึ่งในเมืองพัทยา จังหวัดชลบุรี โดยเป็นเกาะขนาด 4.7 ตารางกิโลเมตร กลางอ่าวไทย[1] มีเกาะครกและเกาะสากเป็นบริวาร ใน พ.ศ. 2562 มีประชากร 2,958 คน[2] เกาะล้านห่างจากเมืองพัทยาเพียง 7.5 กิโลเมตร มี\",\"price_person\":4000,\"discount\":10,\"company_name\":\"qwert\",\"pic_path\":[\"http://localhost:8080/package_tour/lan_1.webp\",\"http://localhost:8080/package_tour/lan_3.jpg\",\"http://localhost:8080/package_tour/lan_2.webp\"]}}"
// }