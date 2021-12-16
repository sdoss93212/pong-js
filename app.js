import Ball from "./Ball.js";
import Bat from "./Bat.js";

const ball = new Ball (document.getElementById('ball'))
const playerBat = new Bat (document.getElementById("player-bat"))
const compBat = new Bat (document.getElementById("comp-bat"))
const pscore = document.getElementById("pscore")
const cscore = document.getElementById("cscore")

let lastTime
function update(time) {
    if(lastTime!=null){
        const delta = time - lastTime
        ball.update(delta, [playerBat.rect(),compBat.rect()])
        compBat.update(delta, ball.y)
        
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

        document.documentElement.style.setProperty("--hue",hue+delta*0.01)

        if(isLose()){
           handleLose()
        }
    }
   
    lastTime = time

   
    window.requestAnimationFrame(update)
}

function handleLose() {
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        pscore.textContent = parseInt(pscore.textContent) + 1
    } else {
        cscore.textContent = parseInt(cscore.textContent) + 1
    }
    ball.reset()
    compBat.reset()
}

function isLose() {
    const rect = ball.rect()
    return (rect.right >= window.innerWidth || rect.left <= 0)
}

document.addEventListener("mousemove", e=>{
    playerBat.position = (e.y /window.innerHeight) * 100
})

window.requestAnimationFrame(update)