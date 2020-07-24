import React from 'react'
import { Link } from 'react-router-dom'

class BroadLink extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (<>
        {
            this.props.to?
            <Link to={this.props.to} 
            className={this.props.className || this.props.class? this.props.className || this.props.class : ""} 
            style={this.props.style? this.props.style : {}}>
                {
                    this.props.children
                }
            </Link>
            :
            <a href={this.props.href}
            className={this.props.className || this.props.class? this.props.className || this.props.class : ""} 
            style={this.props.style? this.props.style : {}}>
                {
                    this.props.children
                }
            </a>
        }
        </>)
    }
}

export default BroadLink