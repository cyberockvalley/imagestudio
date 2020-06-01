import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

class UserHome extends React.Component {
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
                    UserHome
                </div>
                <Footer />
            </div>

        )
    }
}

export default UserHome