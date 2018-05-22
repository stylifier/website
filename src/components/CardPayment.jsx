import React from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends React.Component {

  render() {
    return (
      <div>
        <div style={{marginBottom: 20}}>
          Payment Details:
        </div>
        <CardElement />
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  stripe: React.PropTypes.object
}

export default injectStripe(CheckoutForm);
