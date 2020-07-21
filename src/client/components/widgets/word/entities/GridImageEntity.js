import React from 'react'

export const gridImageStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'GRID_IMAGE'
        );
    }, callback)
}
class GridImageEntity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.setState({
            editLeft: 0,
            editTop: 0
        })
    }

    toggleHovered = () => {
        const hoverState = !this.state.hovered
        this.setState({
            hovered: hoverState,
        })
    }

    onEdit = () => {

    }

    onUpdate = () => {
        const { block, contentState, config } = this.props;
        const entityKey = block.getEntityAt(0)
        /*
        contentState.mergeEntityData(entityKey, { alignment })
        config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'))
        this.setState({
        dummy: true,
        })*/
    }

    render() {
        const { entityKey, children, contentState, config } = this.props; console.log("GIM", config)
        const { 
            gridItemsSpacing,
            alt,
            images
        } = contentState.getEntity(entityKey).getData()
        return <div 
        onMouseEnter={this.toggleHovered}
        onMouseLeave={this.toggleHovered}
        style={{width: "100%", display: "flex", flexWrap: "wrap"}}>
            {
                images.map((image, index) => (
                    <div style={{
                        width: image.width + image.widthType,
                        height: image.height + image.heightType,
                        paddingRight: gridItemsSpacing + "px",
                        paddingBottom: gridItemsSpacing + "px"
                    }}>
                        <img src={image.src} alt={alt} style={{width: "100%", height: "100%"}} />
                    </div>
                ))
            }
            {
                this.state.hovered?
                <div onClick={this.onEdit} className="action" style={{
                    ...styles.hover,
                    left: this.state.editLeft,
                    top: this.state.editTop
                }}>
                   <span className="fa fa-2x fa-pencil"></span>
                </div> : null
            }
        </div>
    }
}

const EDIT_WIDTH = 50
const EDIT_HEIGHT = 50
const styles = {
    hover: {
        position: "absolute",
        width: EDIT_WIDTH,
        height: EDIT_HEIGHT,
        padding: "5px",
        background: "#000",
        opacity: 0.8,
        color: "#bcbcbc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "3px"
    }
}

export default GridImageEntity