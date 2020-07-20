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
    }

    componentDidMount() {
        const { entityKey, children, contentState } = this.props
        const { 
            gridItemsSpacing,
            alt,
            images
        } = contentState.getEntity(entityKey).getData()
        console.log("GridImageEntity", contentState.getEntity(entityKey).getData())
    }

    render() {
        const { entityKey, children, contentState } = this.props
        const { 
            gridItemsSpacing,
            alt,
            images
        } = contentState.getEntity(entityKey).getData()
        return <div style={{width: "100%", display: "flex", flexWrap: "wrap"}}>
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
        </div>
    }
}

export default GridImageEntity