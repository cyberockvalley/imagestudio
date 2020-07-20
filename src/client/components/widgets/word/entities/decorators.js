import GridImageEntity, { gridImageStrategy } from "./GridImageEntity";

export const gridImageDecorator = () => {
    return {
        strategy: gridImageStrategy,
        component: GridImageEntity
    }
}