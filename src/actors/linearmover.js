
const linearMover = (k, deg = 0, len = 50) => {
    const velX = Math.cos(k.deg2rad(deg)) * len
    const velY = Math.sin(k.deg2rad(deg)) * len

    return {
        id: "linear_mover",

        require: [ "pos" ],

        fixedUpdate() {
            this.moveBy(velX * k.fixedDt(), velY * k.fixedDt())
        },
    }
}

export default linearMover
