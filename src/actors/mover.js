
const mover = (k, maxSpeed = 100, acceleration = 680, friction = 510) => {
    return {
        id: "mover",

        require: ["pos"],

        acceleration: acceleration,
        friction: friction,
        maxSpeed: maxSpeed,

        motionX: 0,
        motionY: 0,

        velX: 0,
        velY: 0,

        fixedUpdate() {
            if (this.motionX != 0) {
                this.velX += this.motionX * this.acceleration * k.fixedDt()
                this.velX = k.clamp(this.velX, -this.maxSpeed, this.maxSpeed)
            } else {
                const amount = this.friction * k.fixedDt()

                if (this.velX > 0) {
                    this.velX = Math.max(this.velX - amount, 0)
                } else {
                    this.velX = Math.min(this.velX + amount, 0)
                }
            }

            if (this.motionY != 0) {
                this.velY += this.motionY * this.acceleration * k.fixedDt()
                this.velY = k.clamp(this.velY, -this.maxSpeed, this.maxSpeed)
            } else {
                const amount = this.friction * k.fixedDt()

                if (this.velY > 0) {
                    this.velY = Math.max(this.velY - amount, 0)
                } else {
                    this.velY = Math.min(this.velY + amount, 0)
                }
            }

            this.moveBy(this.velX * k.fixedDt(), this.velY * k.fixedDt())
        },
    }
}

export default mover
