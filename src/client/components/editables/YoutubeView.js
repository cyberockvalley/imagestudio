import React from 'react'

const $ = require('jquery')
class YoutubeView extends React.Component {
    constructor(props) {
        super(props)
    }

    iOS() {
        return [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    componentDidMount() {
        var that = this
        var ctrlVideo = document.getElementById(that.getVideoTagId());
        ctrlVideo.onplay = function() {
            $('button').toggleClass("active");
        }
        if(that.props.autoPlay) {
            if(!this.iOS()) {
                ctrlVideo.play();
            }
        }

        $('button').click(function(){
            ctrlVideo.play();
        });
    }

    getVideoTagId = () => {
        return `video${this.props.videoId}`
    }

    render() {
        const videoId = this.props.videoId
        return (
            <div className={`${this.props.containerClass? this.props.containerClass : ""}`} style={this.props.containerStyle? this.props.containerStyle: {}}>
                <button class="yt-play active"><i id="yt-play-icon" className="fa fa-play"></i></button>
                <video id={this.getVideoTagId()} preload="none" playsInline="playsinline" /*autoPlay={this.props.autoPlay? "autoplay" : null}*/ muted="muted" loop="loop" style={this.props.style? this.props.style : {}}>
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