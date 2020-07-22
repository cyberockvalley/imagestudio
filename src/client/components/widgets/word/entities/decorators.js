import React from "react"

import GridImageEntity, { gridImageStrategy } from "./GridImageEntity";

export const gridImageDecorator = config => {
    return {
        strategy: gridImageStrategy,
        component: GridImageEntity,
        props: {
            config: config
        }
    }
}