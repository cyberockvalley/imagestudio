import React from 'react'
import Recaptcha from 'react-google-invisible-recaptcha'
import { GOOGLE_CAPTCHA_SITE_KEY } from '../../../both/Constants'
import ParseClient, { handleParseError } from '../../../both/Parse'

class PageReaction extends React.Component {
    constructor(props) {
        super(props)
    }

    submitHandler = () => {
        if(!this.props.isValid) {
            if(this.props.onValid) this.props.onValid()
            this.recaptcha.execute()

        } else {
            if(this.props.isValid()) {
                if(this.props.onValid) this.props.onValid()
                this.recaptcha.execute()

            } else {
                this.recaptcha.reset()
            }
        }
    }

    resolveHandler = () => {
        console.log("pageReactionUpdate", this.props.info, this.recaptcha.getResponse())
        ParseClient.Cloud.run('pageReactionUpdate', {
            bot_check_token: this.recaptcha.getResponse(),
            info: this.props.info,
            data: this.props.onData? this.props.onData : null
        })
        .then(response => {
            console.log("pageReactionUpdate", "Data", response)
            this.recaptcha.reset()
        })
        .catch(e => {
            console.log("pageReactionUpdate", "Error", e)
            handleParseError(e)
            this.recaptcha.reset()
        })
    }

    render() {
        return (
            <>
                {
                    this.props.info && this.props.info.pageId && this.props.info.type?
                    <>
                        <span onClick={this.submitHandler}>
                        {
                            this.props.children
                        }
                        </span>
                        <Recaptcha
                        ref={ ref => this.recaptcha = ref }
                        sitekey={GOOGLE_CAPTCHA_SITE_KEY}
                        onResolved={ this.resolveHandler } />
                    </>
                    : <i>{this.props.widget_loading_text || "Loading..."}</i>
                }
            </>
        )
    }
}

export default PageReaction