import React from 'react'
import Recaptcha from 'react-google-invisible-recaptcha'

class Markup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    getBotToken = (tokenHandler) => {
        this.botTokenHandler = tokenHandler
        //console.log("pageT", this.props.botKey || this.state.botKey, this.recaptcha)
        this.recaptcha.execute()
    }

    botTokenResolver = () => {
        if(this.botTokenHandler) this.botTokenHandler(this.recaptcha.getResponse())
    }

    refSetter = ref => {
        //console.log("PageTok", "refSetter", this.props.botKey || this.state.botKey, ref)
        this.recaptcha = ref
    }

    render(child) {
        return (
            <>
            {child}
            {
                this.props.botKey || this.state.botKey?
                <Recaptcha
                ref={ this.refSetter }
                sitekey={this.props.botKey || this.state.botKey}
                onResolved={ this.botTokenResolver } /> : null
            }
            </>
        )
    }
}

export default Markup