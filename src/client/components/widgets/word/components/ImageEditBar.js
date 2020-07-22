import React from 'react'
import Option from '../components/Option'
import '../../../../res/css/react-draft.css'

class ImageEditBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.setState({width: this.props.width || 100})
    }

    alignLeft = () => {
        if(this.props.onLeft) this.props.onLeft()
    }

    alignRight = () => {
        if(this.props.onRight) this.props.onRight()
    }

    alignCenter = () => {
        if(this.props.onCenter) this.props.onCenter()
    }

    handleWidthSlider = e => {
        this.state.width = e.target.value
        this.setState({width: parseInt(e.target.value)})
        this.props.onWidthChange(this.state.width)
    }

    getStyle = () => {
        const style = this.props.bottom? {bottom: "10px"} : {}
        if(this.props.style) style = {...style, ...this.props.style}
        return style
    }

    render() {
        return (
            <div className="edit-bar" style={this.getStyle}>
                <div className="edit-bar-group-item">
                    <Option onClick={this.alignLeft} className="rdw-image-alignment-option fa fa-align-left"></Option>
                    <Option onClick={this.alignCenter} className="rdw-image-alignment-option fa fa-align-center"></Option>
                    <Option onClick={this.alignRight} className="rdw-image-alignment-option fa fa-align-right"></Option>
                </div>
                {
                    this.props.onWidthChange?
                    <div className="edit-bar-group-item" style={{flexDirection: "column", width: "100%"}}>
                        <label for="width" style={{color: "#bcbcbc", textAlign: "center", marginBottom: "0px"}}>{`${this.state.width}%`}</label>
                        <input onChange={this.handleWidthSlider} type="range" class="custom-range" min="0" max="100" value={this.state.width} id="width" style={{width: "70%", margin: "0px auto"}} />
                    </div>
                    : null
                }
                {
                    this.props.moreHandler?
                    <div className="edit-bar-group-item">
                        <Option onClick={this.props.moreHandler} className="rdw-image-alignment-option fa fa-caret-down"></Option>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default ImageEditBar