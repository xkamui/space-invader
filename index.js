import { Entity } from './modules/classes/classEntity.js'
import { Player } from './modules/classes/classPlayer.js'
import { Projectile } from './modules/classes/classProjectile.js'
import { Enemy } from './modules/classes/classEnemy.js'

// Create canvas, change its size and get context from it
const canvas = document.querySelector('#game-container')
setAttributes(canvas, {"width":window.innerWidth, "height":window.innerHeight})
const context = canvas.getContext('2d')

// Create a 'player' in that context
const player = new Player(context, canvas.width / 2, canvas.height / 2, 10, '#CC0000')
      player.draw()

// Create a projectile
const projectile = new Projectile(context, 50, 50, 30, '#336699', {x: 3, y:3})
projectile.draw()

// Create multiple projectiles when the user clicks the window
const projectiles = []
window.addEventListener('click', (e) => {

    // Get the angle from the click
    const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x)

    // Get velocity from the angle
    const velocity = {x: Math.cos(angle) * 5, y: Math.sin(angle) * 5}

    const projectile = new Projectile(context, e.clientX, e.clientY, 5, '#F5F5F5', velocity)
    projectile.draw()
    projectiles.push(projectile)
})

// Create multiple enemies with velocity of {x: -1, y: -1}
const enemies = []
function spawnEnemies(){
    setInterval(() => {

        const radius = Math.random() * (30 - 4) + 4
        
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const color = `rgb(${r}, ${g}, ${b})`
    
        const randomValue = Math.random()
        let x, y
        if (randomValue < .25) {
            x = 0 - radius
            y = Math.random() * canvas.height
        } else if (randomValue >= .25 && randomValue < .5) {
            x = canvas.width + radius
            y = Math.random() * canvas.height
        } else if (randomValue >= .5 && randomValue < .75) {
            x = Math.random() * canvas.width
            y = 0 - radius
        } else {
            x = Math.random() * canvas.width
            y = canvas.height * radius
        }

        const angle = Math.atan2(player.y - y, player.x - x)
        const velocity = {x: Math.cos(angle), y: Math.sin(angle)}

        enemies.push(new Enemy(context, x, y, radius, color, velocity))

    }, 1000)

}
spawnEnemies()

// Detect collisions between enemies and projectiles
enemies.forEach((enemy, enemyIndex) => {
    projectiles.forEach((projectile, projectileIndex) => {
        const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
        if (distance - projectile.radius - enemies.radius <= 0) {
            enemies.splice(enemyIndex, 1)
            projectiles.splice(projectileIndex, 1)
            console.log('touché')
        }
    })
    enemy.update()
})

// Function to animate elements on the canvas
function animate(){
    requestAnimationFrame(animate)

    context.fillStyle = 'rgba(29, 31, 33, .1)'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.map(projectile => projectile.update())
    enemies.map(enemy => enemy.update())
}
animate()
