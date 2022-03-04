import { Entity } from './classEntity.js'

// Define class Player that extends Entity
export class Player extends Entity {
    constructor(context, x, y, radius, color){
        super(context, x, y, radius)
        this.color = color
    }
}