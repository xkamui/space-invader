import { Projectile } from './classProjectile.js'

// Define class Enemy that extends Projectile
export class Enemy extends Projectile {
    constructor(context, x, y, radius, color, velocity){
        super(context, x, y, radius, color, velocity)
    }
}