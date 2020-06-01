import React from 'react'
import Header from './Header'
import Footer from './Footer'

class Home extends React.Component {
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
                    Home
                </div>
                <Footer />
            </div>

        )
    }
}

export default Home