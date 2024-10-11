import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Button} from 'antd';
//import Omise from 'omise';

let OmiseCard
function PaymentCreditCard(props) {
  console.log(props)
    useEffect(() => {
      OmiseCard = handleLoadScript();
    },[]);
    const handleLoadScript = () => {
      const script = document.createElement('script');
        script.src = 'https://cdn.omise.co/omise.js';
        script.async = true;
        document.getElementsByTagName('body')[0].appendChild(script);
        OmiseCard = window.OmiseCard;
        return OmiseCard;
    }
    const creditCardConfigure = async () => {
      if(OmiseCard === undefined)OmiseCard = await handleLoadScript();
      OmiseCard.configure({
        publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
              currency: 'THB',
              frameLabel: 'LoveTravels',
              submitLabel: 'Pay NOW',
              buttonLabel: 'Pay with Omise',
          defaultPaymentMethod: 'credit_card',
          otherPaymentMethods: []
      });
      OmiseCard.configureButton("#credit-card");
      OmiseCard.attach();
      addCart();
    }
    const addCart = () => {
      OmiseCard.open({
       frameDescription : props.item.dataDetail.package_name,
       amount : props.arrPrice.netPrice * 100,
       onCreateTokenSuccess: (token) => {
        console.log(token)
       },
       onFormClosed: () => {}
      });
    }
 return (
    <div className="own-form">
        <form>
            <Button
                id="credit-card"
                type="button"
                onClick={(() => creditCardConfigure())}

            >
                ชำระเงินด้วยบัตรเครดิต
            </Button>
        </form>
    </div>
  );
}

export default PaymentCreditCard
