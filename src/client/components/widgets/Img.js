import React from 'react'
const $ = require('jquery')

class Img extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isEmpty: true}
    }

    componentDidMount() {
        var that = this
        $("img")
        .one("load", () => { 
            that.setState({loading: false, isEmpty: false})
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

    getSizeStyle = () => {
        var style = {}
        if(this.state.isEmpty) {
            if(this.props.emptyWidth) style.width = this.props.emptyWidth
            if(this.props.emptyHeight) {
                style.height = this.props.emptyHeight
                style.display = "block",
                style.background = "black"
                style.opacity = 0.8
            }
        }
        return style
    }

    render() {
        return(
            <span style={this.getSizeStyle()}>
                <img {...this.props} />
                {
                    !this.state.loading? null :
                    <div class="spinner-grow text-info btn-center"></div>
                }
            </span>
        )
    }
}

export default Img