const canvas = document.querySelector('#game-container')

// Change canvas size so it takes full size of the viewport
setAttributes(canvas, {"width":window.innerWidth, "height":window.innerHeight})

// Define class Entity
class Entity {
    constructor(x, y, radius){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = '#CC0000'
    }
    draw(){
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill()
    }
}

// Define class Player that extends Entity
class Player extends Entity {
    constructor(x, y, radius, color){
        super(x, y, radius)
        this.color = color
    }
}

// Define class projectile that extends from the Player
class Projectile extends Player {
    constructor(x, y, radius, color, velocity){
        super(x, y, radius, color)
        this.velocity = velocity
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}


// Get context of the canvas element
const context = canvas.getContext('2d')

// Create a 'player' in that context
const player = new Player(canvas.width / 2, canvas.height / 2, 10, '#CC0000')
      player.draw()

// Create a projectile
const projectile = new Projectile(50, 50, 30, '#336699', {x: 3, y:3})
projectile.draw()

// Create multiple projectiles when the user clicks the window
const projectiles = []
window.addEventListener('click', (e) => {

    // Get the angle from the click
    const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x)

    // Get velocity from the angle
    const velocity = {x: Math.cos(angle) * 5, y: Math.sin(angle) * 5}

    const projectile = new Projectile(e.clientX, e.clientY, 5, '#F5F5F5', velocity)
    projectile.draw()
    projectiles.push(projectile)
})

// Function to add multiple attributes at once
function setAttributes(obj, attributes){
    for (key in attributes) {
        obj.setAttribute(key, attributes[key])
    }
}

// Function to animate elements on the canvas
function animate(){
    requestAnimationFrame(animate)

    context.fillStyle = 'rgba(29, 31, 33, 1)'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.map(projectile => projectile.update())
}
animate()