import React from 'react'
import ReactDOM from "react-dom"
import scriptLoader from 'react-async-script-loader'

const CLIENT = {
    sandbox:
      "AValofCa92yFW4CoplSpC0fWcVq7Qm8L0xf5KGLs3ekLM9SwOpEK7LtTK5gWq1c4JF85PDCb_l12xGYs",
    production:
      "AYRsZa8i4MaMczT9TitS9p0e2VeX7IOgFVtXWk9yUcrAxkGdpg0f4w5Q2Dn34-OwkIFejRdRPwhcxFwC"
}
 
const CLIENT_ID = process.env.NODE_ENV === "production"? CLIENT.production : CLIENT.sandbox;
//create button here
let PayPalButton = null;
 
// next create the class and Bind React and ReactDom to window
//as we will be needing them later

class Spinner extends React.Component {
    render() {
        return(
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
}
class PaypalButton extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          showButtons: false,
          loading: true,
          paid: false
        };
    
        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    
        if (isScriptLoaded && isScriptLoadSucceed) {
          PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
          this.setState({ loading: false, showButtons: true });
        }
    }
    
    componentWillReceiveProps(nextProps) {
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
    
        const scriptJustLoaded =
          !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;
    
        if (scriptJustLoaded) {
          if (isScriptLoadSucceed) {
            PayPalButton = window.paypal.Buttons.driver("react", {
              React,
              ReactDOM
            });
            this.setState({ loading: false, showButtons: true });
          }
        }
    }

    createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.props.description,
              amount: {
                currency_code: this.props.currency_code,
                value: this.props.amount,
                breakdown: {
                    item_total: {value: this.props.amount, currency_code: this.props.currency_code}
                }
              },
              items: this.props.items
            }
          ]
        });
    }
    
    onApprove = (data, actions) => {
        actions.order.capture().then(details => {
            const paymentData = {
            payerID: data.payerID,
            orderID: data.orderID
            }
            this.props.onSuccess()
            this.setState({ showButtons: false, paid: true})
        })
    }


    render() {
        const { showButtons, loading, paid, successMsg } = this.state;

        return (
        <div className="main">
            {loading && <Spinner />}

            {showButtons && (
            <div>
                <PayPalButton
                createOrder={(data, actions) => this.createOrder(data, actions)}
                onApprove={(data, actions) => this.onApprove(data, actions)}
                />
            </div>
            )}
        </div>
        )
    }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton)