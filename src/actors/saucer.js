import { DEPTH_LASER, DEPTH_SAUCER } from "../constants/gameconst"
import pfbExplosion from "../effects/explosion"
import invc from "./invincible"
import mover from "./mover"

const pfbLaser = (k, pos) => ([
    k.sprite("laser"),
    k.z(DEPTH_LASER),
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
        if (obj.has("health")) {
            if (obj.hp > 0) {
                obj.hp--
                laser.destroy()
            }
        }
    })
}

const saucerGun = k => {
    let delay = 0

    return {
        id: "saucer_gun",

        require: [ "pos" ],

        gunLocked: false,

        fixedUpdate() {
            delay = Math.max(delay - k.fixedDt(), 0)
            if (!this.gunLocked && k.isButtonDown("shoot") && delay <= 0) {
                delay = 0.2
                addLaser(k, this.pos)
                k.play("sound_laser", { volume: k.getData("sfx_volume") })
            }
        },
    }
}

const saucerUserInput = k => {
    return {
        id: "saucer_user_input",

        require: [ "mover" ],

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

const pfbSaucer = (k, pos) => ([
    k.sprite("saucer"),
    k.opacity(1),
    k.z(DEPTH_SAUCER),
    k.health(1),
    k.pos(pos),
    k.anchor("center"),
    k.area({
        shape: new k.Polygon([
            k.vec2(-14, -14),
            k.vec2(14, -14),
            k.vec2(14, 14),
            k.vec2(-14, 14),
        ]),
    }),
    k.body(),
    mover(k),
    invc(k),
    saucerGun(k),
    saucerUserInput(k),
    "saucer",
])

const addSaucer = (k, pos) => {
    const saucer = k.add(pfbSaucer(k, pos))

    saucer.onDeath(() => {
        k.add(pfbExplosion(k, saucer.pos))
        k.play("sound_ship_explode", { volume: k.getData("sfx_volume") })
        saucer.destroy()
    })

    return saucer
}

export default addSaucer
