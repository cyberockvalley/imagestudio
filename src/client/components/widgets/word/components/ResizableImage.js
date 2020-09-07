import React from 'react'
import { Resizable } from "re-resizable"
import { DEFAULT_GRID_ITEMS_SPACING } from './ImageArchitect'
import { isFloat } from '../../../../../both/Functions'
const $ = require('jquery')

const MIN_SIZE = 10
class ResizableImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const { width, height, refSetter, widthType, heightType, autoWidth, autoHeight } = this.props
        refSetter(this, this.props.index)
        this.setState({
            loading: true,
            width, height, widthType, heightType, autoWidth, autoHeight
        })
        var that = this
        $("img.check_status")
        .one("load", () => { 
            that.setState({loading: false})
            if(that.props.onload)  that.props.onload()

        })
        .one('error', () => {
            that.setState({loading: false})
            if(that.props.onerror) that.props.onerror()

        }).each(function() {
            if(this.complete) {
                $(this).trigger('load')
            }
        })
    }

    handleResize = (e, direction, ref, d) => {
        this.props.onResize(this, d)
    }

    getWidth = () => {
        return !isFloat(this.state.width)? parseInt(this.state.width) : parseFloat(this.state.width)
    }

    setSize = e => {
        var size = e.target.value
        if(size.startsWith("0")) size = size.substring(1)
        size = isFloat(size)? parseFloat(size) : parseInt(size)
        //if(size < MIN_SIZE) size = MIN_SIZE
        if(!isNaN(size) && size > 100 && (
            (e.target.name == "width" && this.props.widthType == "%") 
            || (e.target.name == "height" && this.props.heightType == "%")
            )) {
            size = 100
        }
        this.state[e.target.name] = !isNaN(size)? size : 0
        this.setState({[e.target.name]: !isNaN(size)? size : 0})
        if(e.target.name == "height") {
            this.props.onResize(this, null)
        }
    }

    setAuto = e => {
        //console.log("setAuto", e.target.checked)
        this.setState({[e.target.name]: e.target.checked})
    }

    render() {
        const {
            widthText, heightText
        } = this.props
        return (
            <Resizable
                size={{ width: this.state.autoWidth? "auto" : this.state.width + this.state.widthType, height: this.state.autoHeight? "auto" : this.state.height + this.state.heightType }}
                onResizeStop={this.handleResize} style={{
                    paddingRight: !isNaN(parseInt(this.props.space))? `${parseInt(this.props.space)}px` : DEFAULT_GRID_ITEMS_SPACING + "px",
                    paddingBottom: !isNaN(parseInt(this.props.space))? `${parseInt(this.props.space)}px` : DEFAULT_GRID_ITEMS_SPACING + "px"
                }}
                handleStyles={styles.handleStyles}
            >
                <img src={this.props.src} class="check_status move" style={{width: "100%", height: "100%"}} />
                <div className="move" style={{
                    ...styles.form,
                    right: `${10 + parseInt(this.props.space || DEFAULT_GRID_ITEMS_SPACING)}px`,
                    bottom: `${10 + parseInt(this.props.space || DEFAULT_GRID_ITEMS_SPACING)}px`
                }}>
                    <div>
                        <label for="item-width" className="col-form-label">
                            {
                                `${widthText || "Width"} (${this.props.widthType}):`
                            }
                        </label>
                        <input style={styles.input} className="form-control col-10" id="item-width" name="width" onChange={this.setSize} type="number" value={this.state.width} />
                    </div>
                    <div className="size-px-auto">
                        <label className="col-form-label">
                            <span>{heightText || "Height"} ({this.props.heightType}): / </span>
                            <div>
                                <label className="action" for="autoHeight"> Make auto</label>
                                <input className="form-check-input action" id="autoHeight" name="autoHeight" onChange={this.setAuto} type="checkbox" checked={this.state.autoHeight} />
                            </div>
                        </label>
                        {
                            !this.state.autoHeight?
                            <input style={styles.input} className="form-control col-10" id="item-height" name="height" onChange={this.setSize} type="number" value={this.state.height} />
                            : null
                        }
                    </div>
                </div>
            </Resizable>
        )
    }

}

const styles = {
    input: {
        background: "#000",
        color: "#bcbcbc",
        height: "30px",
        padding: "5px"
    },
    formGroup: {
        margin: "0px !important"
    },
    form: {
        position: "absolute",
        top: "10px",
        left: "10px",
        padding: "5px",
        margin: "auto",
        backgroundColor: "black",
        color: "#bcbcbc",
        opacity: "0.7",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    handleStyles: {
        right: {
            position: "absolute",
            userSelect: "none",
            width: "10px",
            height: "100%",
            top: "0px",
            right: "5px",
            cursor: "col-resize",
        },
        bottom: {
            position: "absolute",
            userSelect: "none",
            width: "100%",
            height: "10px",
            bottom: "5px",
            left: "0px",
            cursor: "row-resize",
        },
        topRight: {
            position: "absolute",
            userSelect: "none",
            width: "20px",
            height: "20px",
            right: "5px",
            top: "-5px",
            cursor: "ne-resize",
        },
        bottomRight: {
            position: "absolute",
            userSelect: "none",
            width: "20px",
            height: "20px",
            right: "5px",
            bottom: "5px",
            cursor: "se-resize",
        },
        bottomLeft: {
            position: "absolute",
            userSelect: "none",
            width: "20px",
            height: "20px",
            left: "-5px",
            bottom: "5px",
            cursor: "sw-resize",
        }
    }
}

export default ResizableImage