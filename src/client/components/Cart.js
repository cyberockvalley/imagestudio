import React from 'react'
import Page from './Page'
import Header from './Header'
import NavBar from './NavBar'
import FooterContactUs from './FooterContactUs'
import Footer from './Footer'
import EditableStateContext from './editables/EditableStateContext'
import ItemCart from './items/ItemCart'
import { Link } from 'react-router-dom'
import { getCart } from './SingleProductThread'
import { Helmet } from 'react-helmet'
import PaypalButton from './widgets/PaypalButton'
import { IFRAME_STYLES } from './widgets/IframeView'

class Cart extends Page {
    static contextType = EditableStateContext
    constructor(props) {
        super(props)
        this.state = {...this.state, loading_cart: true, items: [], totalPrice: 0}
    }

    componentDidMount() {
        this.loadPage("header_with_footer", {
          no_video: true,
          no_image: true
        })
        this.setCart()
    }

    setCart = (c) => {
        var cart = c? c : getCart()
        var items = Object.values(cart)
        if(items.length == 0) {
            this.setState({loading_cart: false, items: items})

        } else {
            this.setState({loading_cart: c? false : true, items: items})
            this.updatePrice(items)
        }

        //if the price has not been verified, send request to the server with each product item to get their 
        // latest prices
        if(!c) {
            this.setState({loading_cart: false})
        }
    }

    updatePrice = (items) => {
        var price = 0
        for(var i = 0; i < items.length; i++) {
            price += items[i].price * items[i].quantity
        }
        this.setState({totalPrice: price})
    }

    clearCart = () => {
        this.updateCart({})
        this.onCartUpdate()
    }

    updateCart = (cart) => {
        window.localStorage.setItem("cart", JSON.stringify(cart))
        this.setCart(cart)
    }

    onRemoveItem = (id) => {
        var cart = getCart()
        delete cart[id]
        this.updateCart(cart)
        this.onCartUpdate()
    }

    onQtyChange = (id, value) => {
        var cart = getCart()
        cart[id].quantity = value
        this.updateCart(cart)
    }

    checkout = () => {

    }

    setNavRef = nav => {
     this.navBar = nav
    }
    
    onCartUpdate = () => {
        this.navBar.updateCartTotal()
    }

    cleanItems = items => {
        var cleanedItems = []
        items.forEach(item => {
            cleanedItems.push({
                sku: item.sku,
                name: item.name,
                quantity: item.quantity,
                currency: "USD",
                price: item.price,
                unit_amount: {value: item.price, currency_code: 'USD'}
            })
        })
        return cleanedItems
    }

    getOrder = () => {
        var order = {
            currency_code: "USD",
            description: `${this.state.items.length} Preset Order`,
            items: this.cleanItems(this.state.items),
            totalPrice: this.state.totalPrice
        }
        return order
    }

    onOrderSuccessfull = () => {
        this.clearCart()
        var orderMsg = "Order successfull! Your items will be mailed to your email address within 24 hours. Thanks."
        this.setState({order_message: orderMsg})
        return orderMsg
    }

    render() {
        const order = this.getOrder()
        return super.render(
            <>
                <Header history={this.props.history}
                    edit={this.state.edit}
                    user={this.state.user}
                    userRole={this.state.userRole}
                    onEditOrSaveButtonClicked={this.handleEditOrSaveButtonClick}
                    onCancelEdit={this.handleCancelEdit}
                    textEditableProps={this.state.textElementsProps} />
                <NavBar refSetter={this.setNavRef} showCart/>
                <div style={{width: "90%", margin: "55px auto"}}>
                    <div style={{display: "flex", width: "100%", justifyContent: "space-between", marginBottom: "25px"}}>
                        <label>
                            <h1>Cart ${this.state.totalPrice}</h1>
                        </label>
                        <div>
                            <Link to="/shop" type="button" class="btn btn-secondary">Continue shopping</Link>
                        </div>
                    </div>
                    <div>
                    {
                        this.state.items.length == 0?
                        <>
                            <div className="jumbotron">
                                <h2>{this.state.loading_cart? <i>Loading cart...</i> : "Your cart is empty"}</h2>
                            </div>
                        </>
                        :
                        <div>
                            <div style={{marginBottom: "25px"}}>
                                <ItemCart isHeader />
                            {
                                this.state.items.map((value, index) => {
                                    return (
                                        <ItemCart 
                                            {...value}
                                            removeHandler={this.onRemoveItem}
                                            qtyChangeHandler={this.onQtyChange}
                                        />
                                    )
                                })
                            }
                            </div>
                            <div style={{width: "70%", margin: "0px auto", display: "flex", justifyContent: "center"}}>
                               <div className="jumbotron" style={{width: "100%"}}>
                                   {
                                    this.state.items.length > 0?
                                        <h2 style={{marginBottom: "50px"}}>Checkout below</h2> : null
                                    }
                                   <PaypalButton onSuccess={this.onOrderSuccessfull} description={order.description} amount={order.totalPrice} currency_code={order.currency_code} items={order.items} />
                               </div>
                            </div>
                        </div>
                    }
                    {
                        this.state.order_message?
                        <div className="jumbotron" style={{width: "100%"}}>
                            {
                                this.state.order_message
                            }
                        </div> : null
                    }
                    </div>
                </div>
                <FooterContactUs
                edit={this.state.edit}
                user={this.state.user}
                userRole={this.state.userRole}
                textEditableProps={this.state.textElementsProps} />
                <Footer
                edit={this.state.edit}
                user={this.state.user}
                userRole={this.state.userRole}
                textEditableProps={this.state.textElementsProps} />
            </>
        )
    }
}

export default Cart