import React from "react"
import { Link } from "react-router-dom"

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {

    }

    componentDidMount() {

    }

    render() {
        return (
            <nav style={{height: "56px", position: "static", top: "0px"}}>
                <span>Header </span>
                <ul>
                    <li>
                        <Link to="/">Home </Link>
                    </li>
                    <li>
                        <Link to="/user/home">User Home </Link>
                    </li>
                    <li>
                        <Link to="/admin/home">Admin Home </Link>
                    </li>
                </ul>
            </nav>

        )
    }
}

export default Header