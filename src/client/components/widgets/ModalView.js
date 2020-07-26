import React from 'react'
import Modal from '@material-ui/core/Modal'

class ModalView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="modal-container">
                <Modal {...this.props} style={{zIndex: 10000, position: "fixed", inset: "0px"}}>
                    {
                        this.props.children
                    }
                </Modal>
            </div>
        )
    }
}

export default ModalView