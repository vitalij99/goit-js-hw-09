
const start = document.querySelector("[data-start]")
const stop = document.querySelector("[data-stop]")

start.addEventListener("click", getRemoveInterval)
stop.addEventListener("click", getRemoveInterval)

let timerId = null;

function getRemoveInterval({ target }) {  
    
    if (target.dataset.start !== undefined) {
        target.disabled = true
        stop.disabled = false
        getBodyColor()
        timerId = setInterval(getBodyColor, 1000)
                
    } else {
        target.disabled = true
        start.disabled = false        
        clearInterval(timerId)        
    }  
}

function getBodyColor() {    
    document.body.style.backgroundColor = getRandomHexColor()
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}