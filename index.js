const canvas = document.querySelector('#game-container')

// Change canvas size so it takes full size of the viewport
setAttributes(canvas, {"width":window.innerWidth, "height":window.innerHeight})

// Get context of the canvas element
const context = canvas.getContext('2d')

// Create a 'player' in that context
      context.beginPath()
      context.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2, false)
      context.fillStyle = "#CC0000"
      context.fill()




// Fonction to add multiple attributes at once
function setAttributes(obj, attributes){
    for (key in attributes) {
        obj.setAttribute(key, attributes[key])
    }
}