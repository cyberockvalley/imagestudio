import React from 'react'
import ParseClient, { handleParseError } from '../../../both/Parse'

class InstaGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        posts: []
    }

    componentDidMount() {
        ParseClient.Cloud.run('instagramPosts')
        .then(response => {
            console.log("instagramPosts", "Data", response)
            this.setState({posts: response})
        })
        .catch(e => {
            console.log("instagramPosts", "Error", e)
            handleParseError(e)
        })
    }
    render() {
        return (
            <div className="row instagram-images" style={{padding: "10px"}}>
            {
                this.state.posts.map((post, index) => {
                    var isImage = post.media_type.toUpperCase() == "IMAGE" || post.media_type.toUpperCase() == "CAROUSEL_IMAGE"
                    return (
                        <div key={index} className="col-sm-6 col-md-4">
                            {
                                isImage?
                                <a href={post.permalink} className="data-el img-data-el" style={{backgroundImage: `url(${post.media_url})`}}>
                                    <svg className="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	                                    <path fill="currentColor" d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path>
                                    </svg>
                                </a>
                                :
                                <d className="data-el img-data-el" style={{backgroundImage: `url(${post.media_url})`}}>
                                    <a className="copy" href={post.permalink} style={{display: "block"}}>
                                        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	                                        <path fill="currentColor" d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path>
                                        </svg>
                                    </a>
                                    <video>
                                        <source src={post.media_url} />
                                    </video>
                                </d>
                            }
                        </div>
                    )
                })
            }
            </div>
        )
    }
}

export default InstaGrid