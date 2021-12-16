const COMP_SPEED = 0.02
export default class Bat {
    constructor(batElem) {
        this.batElem = batElem
        this.reset()
    }

    get position() {
        return parseFloat(getComputedStyle(this.batElem).getPropertyValue("--position"))
    }
    set position(value) {
        this.batElem.style.setProperty("--position",value)
    }

    rect() {
        return this.batElem.getBoundingClientRect()
    }

    reset(){
        this.position =50
    }

    update(delta,ballHeight){
        this.position += COMP_SPEED *delta*(ballHeight-this.position)
    }
}