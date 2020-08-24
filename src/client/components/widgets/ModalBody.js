import React from 'react'

class ModalBody extends React.Component {

    constructor(props){
        super(props)
    }

    ok = () => {
        if(this.props.okHandler) this.props.okHandler()
    }

    cancel = () => {
        if(this.props.cancelHandler) this.props.cancelHandler()
    }

    render() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.cancel}>&times;</button>
                    {
                        this.props.headerText?
                        this.props.headerText : null
                    }
                </div>
                <div className="modal-body">
                    {
                        !this.props.contentAsHtml?
                        <p>{this.props.content}</p> 
                        :
                        <p dangerouslySetInnerHTML={{__html: this.props.content}}></p>
                    }
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" onClick={this.ok}>{this.props.okText}</button>
                </div>
            </div>
        )
    }
}

export default ModalBody