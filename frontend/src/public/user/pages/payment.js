import React,{ useState} from "react";
import {Row,Col,Tabs,Divider} from 'antd'
import LocalStorages from '../../../services/localStorages';

import Header from '../components/header';
import PaymentQrcodeForm from '../components/paymentQrcodeForm';

import formatMoney from '../formatMoney';
import '../allStyle.css';

function Confirm_payment () {
    const setDetail = () => {
        const result = LocalStorages.getToken('tempBooking');
        return result.tempBooking ? JSON.parse(result.tempBooking) : null;
    }
    const [items, setItems] = useState(setDetail());
    //     setItems(prevItems => ({
    //         ...prevItems,...JSON.parse(result.tempBooking)
    //     }));

    const wrapSpan = {xs : 23, sm : 23, md : 23, lg : 14, xl : 14, xxl : 12};
    const tabsBar = [
    {
        key: '1',
        label: 'QRcode Payment',
        children: <PaymentQrcodeForm items={items}/>,
    },
    {
        key: '2',
        label: 'Credit Card',
        children: 'creditcard is coming soon',
    }
    ];
    const arrPrice = {
        price : items.dataDetail.price_person*items.dataSearch.amount,
        discountPrice : (items.dataDetail.price_person*items.dataSearch.amount)*items.dataDetail.discount/100,
        netPrice : (items.dataDetail.price_person*items.dataSearch.amount)-((items.dataDetail.price_person*items.dataSearch.amount)*items.dataDetail.discount/100)
    }
    return (<>
    <Header />
    <Row justify="center">
        <Col className="card_bg" {...wrapSpan}>
            <Row>
                <Col span={10}><img src={items.dataDetail.pic_path[0]} alt={items.dataDetail.package_name} style={{width : '100%',height:'150px'}}/></Col>
                <Col span={12} offset={2}><span className="text_main">{items.dataDetail.package_name}</span><br /><span className="text_sub">{items.dataDetail.company_name}</span></Col>
            </Row>
            <Divider />
            <Row style={{textAlign: 'center'}}>
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
            </Row>
            <Row justify="space-around" style={{marginTop : '20px'}}>
                <Col span={8} style={{textAlign: 'left'}}><span className="text_main">Price Per Person</span><br /><span className="price">{formatMoney(items.dataDetail.price_person)}</span></Col>
                <Col span={8} style={{textAlign: 'right'}}><span className="text_main">Sum Price</span><br /><span className="price_discount">{formatMoney(arrPrice.price)}</span><br /><span className="price" style={{fontSize : '18px'}}>{formatMoney(arrPrice.discountPrice)}</span><br /><span className="price_sum">{formatMoney(arrPrice.netPrice)}</span><br /><span className="sub_description"> * text includes</span></Col>
            </Row>
        </Col>
    </Row>
    <Row justify="center">
        <Col className="card_bg"  {...wrapSpan}>
            <span className="header_main">Payment method</span>
            <Tabs defaultActiveKey="1" items={tabsBar} /*onChange={onChangeTabs}*/ />
        </Col>
    </Row>
    </>);
}

export default Confirm_payment;

// {
//     "tempBooking": "{\"dataSearch\":{\"search\":null,\"checkIn\":\"2024-09-22\",\"checkOut\":\"2024-09-24\",\"amount\":3},\"dataDetail\":{\"package_name\":\"เกาะล้าน (Koh Lan Pattaya)\",\"description\":\"เป็นแขวงหนึ่งในเมืองพัทยา จังหวัดชลบุรี โดยเป็นเกาะขนาด 4.7 ตารางกิโลเมตร กลางอ่าวไทย[1] มีเกาะครกและเกาะสากเป็นบริวาร ใน พ.ศ. 2562 มีประชากร 2,958 คน[2] เกาะล้านห่างจากเมืองพัทยาเพียง 7.5 กิโลเมตร มี\",\"price_person\":4000,\"discount\":10,\"company_name\":\"qwert\",\"pic_path\":[\"http://localhost:8080/package_tour/lan_1.webp\",\"http://localhost:8080/package_tour/lan_3.jpg\",\"http://localhost:8080/package_tour/lan_2.webp\"]}}"
// }