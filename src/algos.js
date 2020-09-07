
//this algorithm takes a matrix e.g a grid of images, i
/**
 * 
 * @param {* The total number of items in a grid, e.g The total number of images in a grid} matrixArea
 * @param {* The position of the item we're trying to get the elements which are on the same row 
 * with it} itemIndex 
 * @param {* the width of the item with the @param itemIndex} itemWidth
 * @param {* the callback method that takes the current row width, the index of the current global 
 * neigbour(row, columnwise)
 * This callback method will add the currentRowWidth with the current global neighbour width and compare the result 
 * with the maximum width of a row.
 * If the result is greater than the maximum row width, it returns the result; 
 * else it returns a number not greater than the currentRowWidth } onRowWidth 
 */
export const getRowNeighbours = (matrixArea, itemIndex, maxRowWidth, onItemWidth) => {
    var currentRowWidth = 0
    var neigbours = []
    for(var i = 0; i < matrixArea; i++) {
        //get the new row width after the width of the elements at i has been added to the 
        // currentRowWidth
        var itemWidth = onItemWidth(i)
        var newRowWidth = currentRowWidth + itemWidth
        //console.log("onImageResize", "currentW", currentRowWidth, "itemWidth", itemWidth, "newW", newRowWidth)
        if(i != itemIndex) neigbours.push(i)
        if(Math.round(newRowWidth) < maxRowWidth) {
            //if we get here, then it means the element at i has not broken to the next row,
            // and it's probably a neighbour :)
            currentRowWidth = newRowWidth

        } else {
            //If we get here, then it means we are at the start of a new row,
            // and it's time to continue searching for our neighbours in a new neigbourhood,
            //or hopefully the items in this neigbourhood passing our neigbour test
            if(i < itemIndex) {
                //If the current index is less than the item's index, then item does not leave 
                // in this neigbourhood, but probably the next hood(row)
                //We clean the room for our neigbours
                neigbours = [] 
                currentRowWidth = 0

            } else {
                //Yes! Finally. Good morning my neigbours!
                //("onImageResize", "getRowNeighbours", neigbours)
                return neigbours
            }
        }
    }
    return neigbours
}