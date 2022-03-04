import { Enemy } from './classEnemy.js'

// Define class Particle that extends Enemy
export class Particle extends Enemy {
    constructor(context, x, y, radius, color, velocity){
        super(context, x, y, radius, color, velocity)
        this.alpha = 1
    }

    draw() {
        this.context.save()
        this.context.globalAlpha = this.alpha
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.context.fillStyle = this.color
        this.context.fill()
        this.context.restore()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= .01

    }
}