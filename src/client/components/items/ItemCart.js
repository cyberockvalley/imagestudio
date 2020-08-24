import React from 'react'
import ModalView from '../widgets/ModalView'
import ModalBody from '../widgets/ModalBody'
import { escapeHtml } from '../../../both/Functions'

class ItemCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    remove = () => {
        if(this.props.removeHandler) {
            this.setState({dialog: true})
        }
    }

    closeDialog = () => {
        this.setState({dialog: false})
    }

    handelQtyChange = e => {
        var value = parseInt(e.target.value) > 0? e.target.value : 1
        this.setState({quantity: value, totalPrice: this.props.price * value})
        if(this.props.qtyChangeHandler) this.props.qtyChangeHandler(this.props.sku, value)
    }

    componentDidMount() {
        this.setState({quantity: this.props.quantity, totalPrice: this.props.price * this.props.quantity})
    }

    render() {
        return (
            <>
                <div className={`row ${this.props.isHeader? "" : "jumbotron"}`} style={{width: "100%", borderBottom: "1px solid #bfbfbf", marginBottom: this.props.isHeader? 0 : 10}}>
                    <div className="col-5" style={{display: "flex", flexDirection: "row"}}>
                        {
                            this.props.isHeader?
                            <div>Item</div> : 
                            <>
                                <img src={this.props.thumb && this.props.thumb.includes("/files/")? this.props.thumb : ""} className="img-thumbnail" style={{width: "100px", height: "100px", marginRight: "15px"}} />
                                <div>{this.props.name}</div>
                            </>
                        }
                    </div>
                    <div className="col-2">
                        {
                            this.props.isHeader?
                            <div>Price Per Item</div> : <span>${this.props.price}</span>
                        }
                    </div>
                    <div className="col-2">
                        {
                            this.props.isHeader?
                            <span>Seats / Quantity</span> :
                            <div class="form-group">
                                <input type="number" class="form-control" value={this.state.quantity} onChange={this.handelQtyChange} />
                            </div>
                        }
                    </div>
                    <div className="col-3" style={{display: "flex", flexDirection: "row"}}>
                        {
                            this.props.isHeader?
                            <span>Price</span> : 
                            <>
                                <div>${this.state.totalPrice}</div>
                                <button type="button" className="btn btn-danger" onClick={this.remove} 
                                style={{marginLeft: "15px", width: "30px", height: "30px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>X</button>
                            </>
                        }
                    </div>
                </div>
                <ModalView open={this.state.dialog} onClose={this.closeDialog}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "90%", maxWidth: "500px", margin: "25px auto"}}>
                        <ModalBody 
                            content={`Are you sure you want to remove <b>${escapeHtml(this.props.name)}</b> from your cart?`}
                            contentAsHtml
                            okText={"It's alright."}
                            okHandler={() => this.props.removeHandler(this.props.sku)}
                            cancelHandler={this.closeDialog} />
                    </div>
                </ModalView>
            </>
        )
    }
}

export default ItemCart