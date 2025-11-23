
const pfbLaser = (k, pos) => ([
    k.sprite("laser"),
    k.pos(pos),
    k.rotate(90),
    k.anchor("center"),
    k.area(),
    k.offscreen({ destroy: true }),
    {
        id: "projectile_laser",

        fixedUpdate() {
            this.moveBy(0, 350 * k.fixedDt())
        },
    },
    "laser",
])

const addLaser = (k, pos) => {
    const laser = k.add(pfbLaser(k, pos))
    laser.onCollide("building", (obj, col) => {
        laser.destroy()
    })
}

const saucerGun = k => {
    let delay = 0

    return {
        id: "saucer_gun",

        require: [ "pos" ],

        fixedUpdate() {
            delay = Math.max(delay - k.fixedDt(), 0)
            if (k.isButtonDown("shoot") && delay <= 0) {
                delay = 0.2
                addLaser(k, this.pos)
            }
        },
    }
}

const saucerUserInput = k => {
    return {
        id: "saucer_user_input",

        require: ["mover"],

        update() {
            if (k.isButtonDown("move_right")) {
                this.motionX = 1
            } else if (k.isButtonDown("move_left")) {
                this.motionX = -1
            } else {
                this.motionX = 0
            }

            if (k.isButtonDown("move_down")) {
                this.motionY = 1
            } else if (k.isButtonDown("move_up")) {
                this.motionY = -1
            } else {
                this.motionY = 0
            }
        },
    }
}

export { pfbLaser, saucerGun }
export default saucerUserInput
