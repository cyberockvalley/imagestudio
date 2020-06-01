import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

class AdminHome extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    AdminHome
                </div>
                <Footer />
            </div>

        )
    }
}

export default AdminHome