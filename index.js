import { Entity } from './modules/classes/classEntity.js'
import { Player } from './modules/classes/classPlayer.js'
import { Projectile } from './modules/classes/classProjectile.js'
import { Enemy } from './modules/classes/classEnemy.js'
import { Particle } from './modules/classes/classParticle.js'

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

// Function to animate elements on the canvas
let animationId
function animate(){
    animationId = requestAnimationFrame(animate)

    context.fillStyle = 'rgba(29, 31, 33, .1)'
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    player.draw()
    
    projectiles.forEach((projectile, index) => {
        
        if (
            projectile.x - projectile.radius < 0 || 
            projectile.x + projectile.radius > canvas.width || 
            projectile.y - projectile.radius < 0 || 
            projectile.y + projectile.radius > canvas.height
        ) {
            projectiles.splice(index, 1)
        }
        projectile.update()
    })
    
    enemies.forEach((enemy, enemyIndex) => {
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (distance - projectile.radius - enemies.radius <= 0) {

                for (let i = 0; i < 8; i++) {
                    particles.push(new Particle(context, projectile.x, projectile.y, Math.random() * (3 - 1) + 1, enemy.color, { x: (Math.random() - .5) * 3, y: (Math.random() - .5) * 3}))
                }

                particles.forEach((particle, index) => {
                    if (particle.alpha <= 0) {
                        particles.splice(index, 1)
                    } else {
                        particle.update()
                    }
                })

                if (enemy.radius -10 > 5) {
                    console.log('Enemy hit! 💢')
                    gsap.to(enemy, { radius: enemy.radius - 10, })
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                } else {
                    console.log('Enemy destroyed!! 💥')
                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }
            }

            const distPlayerEnemy = Math.hypot(player.x - enemy.x, player.y - enemy.y)
            if (distPlayerEnemy - enemy.radius - player.radius <= 0) {
                console.log('Game over… 😥')
                cancelAnimationFrame(animationId)
            }

            enemy.update()

        })
    })
}
animate()
