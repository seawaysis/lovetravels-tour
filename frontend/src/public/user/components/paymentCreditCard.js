import React,{ useEffect } from 'react';
import {Button} from 'antd';

function PaymentCreditCard() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.omise.co/omise.js';
        script.async = true;
        document.getElementsByTagName('body')[0].appendChild(script);
    },[]);

    const creditCardConfig = () => {
        let OmiseCard = window.OmiseCard;
        OmiseCard.configure({
            publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
            defaultPaymentMethod: "credit_card",
            captureRejectionSymbol: 'thb',
            frameLabel: 'Lovetravels',
            submitLabel: 'PAY NOW',
            buttonLabel : 'Pay with Omise' 
        });
        OmiseCard.attach();
    }
  return (
    <div>
      <Button onClick={creditCardConfig}>test</Button>
    </div>
  )
}

export default PaymentCreditCard
