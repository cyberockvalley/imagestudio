import React from 'react'
import ParseClient, { handleParseError } from '../../../both/Parse'
import { isClient } from '../../../both/Functions'

class InstaGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    

    componentDidMount() {
        ParseClient.Cloud.run('instagramPosts')
        .then(response => {
            //console.log("instagramPosts", "Data", response)
            if(Array.isArray(response)) this.setState({posts: response})
        })
        .catch(e => {
            //console.log("instagramPosts", "Error", e)
            handleParseError(e)
        })
    }
    render() {
        //17841403997008138
        //17841402237402847
        //2600836993509564
        //{"app_id":"2600836993509564","user_id":"17841402237402847","nonce":"ACpbqXyATkZF6w4a"}
        return (
            <div className="row instagram-images" style={{padding: "10px"}}>
            {
                this.state.posts.map((post, index) => {
                    var isImage = post.media_type.toUpperCase() == "IMAGE" || post.media_type.toUpperCase() == "CAROUSEL_IMAGE"
                    return (
                        <div onClick={() => {
                            if(isClient()) {
                                var win = window.open(post.permalink, '_blank')
                                win.focus()
                            }
                        }} dataType={post.media_type} key={index} className="col-sm-6 col-md-4 action data-el">
                            <picture style={{width: "100%", height: "100%"}}>
                                <img style={{width: "100%", height: "100%"}} className="lazyload" data-src={post.media_url} />
                            </picture>
                            <div style={{position: "absolute", top: 0, left: 0, padding: "inherit !important", width: "100%", height: "100%", display: "flex", justifyContent: "end"}}>
                                <span className="fa fa-copy" style={{textShadow: "0 0 8px rgba(0,0,0,.3)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 3, border: "1px solid #fff", color: "#fff", width: "24px", height: "24px", margin: "15px"}}></span>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}
export default InstaGrid