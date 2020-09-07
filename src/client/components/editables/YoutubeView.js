import React from 'react'

class YoutubeView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const videoId = this.props.videoId
        return (
            <div style={this.props.containerStyle? this.props.containerStyle: {}}>
                <video preload="none" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" style={this.props.style? this.props.style : {}}>
                {
                    videoId?
                    <source className="lazyloads" src={`/youtube/${videoId}/video.mp4?itag=136`} type="video/mp4" /> : null
                }
                </video>
            </div>
        )
    }
}

export default YoutubeView