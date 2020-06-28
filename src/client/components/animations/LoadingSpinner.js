import React from 'react'

class LoadingSpinner extends React.PureComponent {
    constructor(props) {
        super(props)
    }
/*
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  */
    getStyle = () => {
        var thickness = this.props.thickness? this.props.thickness : 16
        var circleColor = this.props.circleColor? this.props.circleColor : "#f3f3f3"
        var runnerColor = this.props.runnerColor? this.props.runnerColor : "#3498db"
        var style = {
            border: `${thickness}px solid ${circleColor}`,
            borderTop: `${thickness}px solid ${runnerColor}`
        }
        if(this.props.width) style.width = this.props.width
        if(this.props.height) style.height = this.props.height
        return style
    }
    render() {
        return(
            <div class="loading-spinner" style={this.getStyle()}></div>
        )
    }
}

export default LoadingSpinner