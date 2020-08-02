import React from 'react'
import ModalView from './ModalView'

export const IFRAME_STYLES = {
    modal: 0,
    inline: 1
}
class IframeView extends React.Component {
    constructor(props) {
        super(props);
        //open={this.state.openModal}
        //onClose={this.handleModalClose}
        this.state = {}
    }

    componentDidMount() {
        console.log("IFRAME_SRC", this.props.iframeSrc)
        this.setState({iframeSrc: this.props.iframeSrc})
    }

    handleModalClose = () => {
        console.log("toggleIframeModal", 1, this.props.onIframeModalClose)
        if(this.props.onModalClose) this.props.onModalClose()
    }

    handlePrev = () => {
        if(this.props.onModalPrev) {
            this.props.onModalPrev()
            .then(data => {
                this.updateIframe(data)
            })
            .catch(e => {

            })
        }
    }

    handleNext = () => {
        if(this.props.onModalNext) {
            this.props.onModalNext()
            .then(data => {
                this.updateIframe(data)
            })
            .catch(e => {
                
            })
        }
    }

    updateIframe = data => {
        if(data && data.iframeSrc) this.setState({iframeSrc: data.iframeSrc})
    }

    render() {
        if(!this.props.iframeSrc || !this.props.showIframe) return null
        const { iframeSrc } = this.props
        return <>
            {
                this.props.iframeStyle == IFRAME_STYLES.modal?
                <ModalView open={true} onClose={this.handleModalClose}>
                    <div style={styles.modalContainer}>
                        <div style={styles.modalLeftWidget}>
                            <span className="fa fa-3x fa-arrow-circle-left action white" onClick={this.handlePrev}></span>
                        </div>
                        <div style={styles.modalCenterWidget}>
                            <div style={styles.modalIframe}>
                                <iframe className="iframe-responsive" width="100%" height="100%" src={`${iframeSrc}?mute=${this.props.mute? 1 : 0}&showinfo=${this.props.hideInfo? 0 : 1}&autoplay=${this.props.autoPlay? 1 : 0}&rel=${this.props.disableRel? 0 : 1}&controls=${this.props.disableControls? 0 : 1}&loop=${this.props.loop? 1 : 0}&disablekb=${this.props.disableKb? 1 : 0}&modestbranding=${this.props.disableLogo? 1 : 0}&fs=${this.props.disableFullscreen? 0 : 1}${this.props.loop? "&playlist=" + this.props.playListId : ""}`} frameborder="0" style={this.props.style? this.props.style : {}} allowFullScreen></iframe>
                            </div>
                        </div>
                        <div style={styles.modalRightWidget}>
                            <span className="fa fa-3x fa-times-circle action white" onClick={this.handleModalClose}></span>
                            <span className="fa fa-3x fa-arrow-circle-right action white" onClick={this.handleNext}></span>
                            <span className="fa fa-3x fa-times-circle action white" style={{visibility: "hidden"}}></span>
                        </div>
                    </div>
                </ModalView>
                : null
            }
            {
                this.props.iframeStyle == IFRAME_STYLES.inline?
                <div style={this.props.containerStyle? this.props.containerStyle: {}}>
                    <iframe className="iframe-responsive" width="100%" height="100%" src={`${iframeSrc}?mute=${this.props.mute? 1 : 0}&showinfo=${this.props.hideInfo? 0 : 1}&autoplay=${this.props.autoPlay? 1 : 0}&rel=${this.props.disableRel? 0 : 1}&controls=${this.props.disableControls? 0 : 1}&loop=${this.props.loop? 1 : 0}&disablekb=${this.props.disableKb? 1 : 0}&modestbranding=${this.props.disableLogo? 1 : 0}&fs=${this.props.disableFullscreen? 0 : 1}${this.props.loop? "&playlist=" + this.props.playListId : ""}`} frameborder="0" style={this.props.style? this.props.style : {}} allowFullScreen></iframe>
                </div>
                : null
            }
        </>
    }
}

const styles = {
    modalLeftWidget: {
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "15%",
        height: "100%"

    },
    modalRightWidget: {
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "15%",
        height: "100%"

    },
    modalCenterWidget: {
        padding: "50px 0px",
        width: "70%",
        height: "100%"
    },
    modalIframe: {
        background: "#000",
        width: "100%",
        height: "100%"
    }
}

export default IframeView