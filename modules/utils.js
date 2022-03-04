// Function to add multiple attributes at once
function setAttributes(obj, attributes){
    for (let key in attributes) {
        obj.setAttribute(key, attributes[key])
    }
}

