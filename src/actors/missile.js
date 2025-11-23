import { GAME_WIDTH } from "../constants/gameconst"
import { forwardMover } from "./mover"

const missileBehavior = k => {
    let onTheSide = false
    let rotAmount = k.rand(-30, 30)

    return {
        id: "missile_behavior",

        require: [ "pos", "rotate" ],

        fixedUpdate() {
            if (this.pos.x > GAME_WIDTH * 0.6) {
                onTheSide = true
                this.rotateBy(-45 * k.fixedDt())
            } else if (this.pos.x < GAME_WIDTH * 0.4) {
                onTheSide = true
                this.rotateBy(45 * k.fixedDt())
            } else {
                if (onTheSide) {
                    rotAmount = k.rand(-30, 30)
                    onTheSide = false
                }
                this.rotateBy(rotAmount * k.fixedDt())
            }
        },
    }
}

const pfbMissile = (k, pos) => ([
    k.sprite("missile"),
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
    forwardMover(k),
    "missile",
])

const addMissile = (k, pos) => {
    k.add(pfbMissile(k, pos))
}

export default addMissile
