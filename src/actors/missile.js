import { DEPTH_MISSILE, DEPTH_ROCKET_SMOKE, GAME_WIDTH } from "../constants/gameconst"
import lifeTime from "./lifetime"
import linearMover from "./linearmover"
import { forwardMover } from "./mover"

const RECENTER_ROT = 15

const mbRotRand = k => k.rand(-30, 30)

const pfbRocketSmoke = (k, pos, deg = 0) => ([
    k.sprite("smoke_small"),
    k.z(DEPTH_ROCKET_SMOKE),
    k.pos(pos),
    k.anchor("center"),
    lifeTime(k, 0.5),
    linearMover(k, deg),
])

const missileExhaust = k => {
    return {
        id: "missile_exhaust",

        require: [ "pos", "rotate" ],

        delayExhaust: 0.2,

        fixedUpdate() {
            this.delayExhaust -= k.fixedDt()
            if (this.delayExhaust <= 0) {
                this.delayExhaust = 0.2
                this.putExhaust()
            }
        },

        putExhaust() {
            k.add(pfbRocketSmoke(k, this.pos, this.angle + 180))
        },
    }
}

const missileBehavior = k => {
    let onTheSide = false
    let rotAmount = mbRotRand(k)

    return {
        id: "missile_behavior",

        require: [ "pos", "rotate" ],

        fixedUpdate() {
            if (this.pos.x > GAME_WIDTH * 0.6) {
                onTheSide = true
                this.rotateBy(-RECENTER_ROT * k.fixedDt())
            } else if (this.pos.x < GAME_WIDTH * 0.4) {
                onTheSide = true
                this.rotateBy(RECENTER_ROT * k.fixedDt())
            } else {
                if (onTheSide) {
                    rotAmount = mbRotRand(k)
                    onTheSide = false
                }
                this.rotateBy(rotAmount * k.fixedDt())
            }
        },
    }
}

const pfbMissile = (k, pos) => ([
    k.sprite("missile"),
    k.z(DEPTH_MISSILE),
    k.pos(pos),
    k.rotate(-90),
    k.anchor("center"),
    k.area({
        shape: new k.Polygon([
            k.vec2(-8, -8),
            k.vec2(8, -8),
            k.vec2(8, 8),
            k.vec2(-8, 8),
        ]),
    }),
    k.offscreen({ destroy: true }),
    missileBehavior(k),
    missileExhaust(k),
    forwardMover(k),
    "missile",
])

const addMissile = (k, pos) => {
    const m = k.add(pfbMissile(k, pos))
    m.onCollide("saucer", (obj, col) => {
        m.destroy()

        if (!obj.has("health")) {
            return
        }

        if (obj.has("invincible")) {
            if (!obj.canTakeDamage) {
                return
            }
        }

        obj.hp--
    })
}

export default addMissile
