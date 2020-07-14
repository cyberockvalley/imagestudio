const PAGE_DIRECTION = {
    prev: 0,
    next: 1
}
const REFACTORY = {
    page: 0,
    limit: 15,
    pageRequestDirection: PAGE_DIRECTION.next,
    lastResultCount: 0,
    lastResultExpectedCount: 0,
    hiddenResults: []
}
class Pagination {
    constructor(limit) {
        this.reset()
        this.state.limit = limit
    }

    reset = () => {
        this.state = {...REFACTORY}
    }

    
    setPage = page => {
        this.state.page = page
    }

    getPage = () => {
        return this.state.page
    }

    getNextLimit = () => {
        return this.state.limit + 1
    }

    getPrevLimit = () => {
        return this.state.limit + 1
    }

    getNextSkip = (currentItemsSize) => {
        this.state.pageRequestDirection = PAGE_DIRECTION.next

        this.state.lastResultExpectedCount = this.getNextLimit()
        //page * max jumps the cursor to the first item in the next page
        var skip = (this.state.page * this.state.limit) + this.state.hiddenResults.length
        return currentItemsSize + this.state.hiddenResults.length > skip? currentItemsSize + this.state.hiddenResults.length : skip

    }

    getPrevSkip = (currentItemsSize) => {
        this.state.pageRequestDirection = PAGE_DIRECTION.prev

        this.state.lastResultExpectedCount = this.getPrevLimit()
        //(page - 2) * max jumps the cursor to the first item in the previous page
        var skip = ((this.state.page - 2) * this.state.limit) + this.state.hiddenResults.length
        return currentItemsSize + this.state.hiddenResults.length > skip? currentItemsSize + this.state.hiddenResults.length : skip
    }

    hasNext = () => {
        return this.state.lastResultCount == this.state.lastResultExpectedCount
    }

    hasPrev = () => {
        return this.state.page > 0
    }

    update = results => {
        this.state.lastResultCount = results.length
        this.state.hiddenResults = [...this.state.hiddenResults, ...results]
        var list = []
        if(this.state.hiddenResults.length > 0) {
            while(list.length < this.state.limit && this.state.hiddenResults.length > 0) {
                list.push(this.state.hiddenResults.shift())
            }
            this.state.page += 1
        }
        console.log("PAGINATION", "update", this.state.page, this.state.lastResultCount, this.state.lastResultExpectedCount - this.state.limit)
        return list
    }

}

export default Pagination