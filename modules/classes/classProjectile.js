import  { Player } from './classPlayer.js'

// Define class projectile that extends from the Player
export class Projectile extends Player {
    constructor(context, x, y, radius, color, velocity){
        super(context, x, y, radius, color)
        this.velocity = velocity
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}