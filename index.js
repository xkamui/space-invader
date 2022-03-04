const canvas = document.querySelector('#game-container')

// Change canvas size so it takes full size of the viewport
setAttributes(canvas, {"width":window.innerWidth, "height":window.innerHeight})






// Fonction to add multiple attributes at once
function setAttributes(obj, attributes){
    for (key in attributes) {
        obj.setAttribute(key, attributes[key])
    }
}