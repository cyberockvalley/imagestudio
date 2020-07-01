import React from 'react'
import Editable from './Editable';

class ListItemEditable extends Editable {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
            {
                this.haveReadPermission?
                <div className={this.props.className}>

                </div>
                :<></>
            }
            </>
        )
    }
}

export default ListItemEditable