import { DEPTH_BUILDING } from "../constants/gameconst"
import flasher from "../effects/flasher"
import addSmokePlace from "../effects/smokeplace"

const pfbBuilding = (k, pos) => ([
    k.sprite("building_sheet", { frame: 0 }),
    k.z(DEPTH_BUILDING),
    k.health(20),
    k.pos(pos),
    k.anchor("botleft"),
    k.area(),
    flasher(k),
    {
        id: "behav_building",

        smoked: false,

        smoke() {
            if (this.smoked) {
                return
            }

            this.smoked = true

            addSmokePlace(k, k.vec2(this.pos.x + 32, this.pos.y - 16))
        },
    },
    "building",
])

const addBuilding = (k, pos) => {
    const b = k.add(pfbBuilding(k, pos))

    b.onHurt((deltaHP) => {
        b.startFlash()

        if (b.hp >= 15) {
            b.frame = 0
        } else if (b.hp >= 7) {
            b.frame = 1
            b.smoke()
        } else if (b.hp >= 1) {
            b.frame = 2
        } else {
            b.frame = 3
        }
        k.play("sound_hit", { volume: k.getData("sfx_volume") })
    })

    b.use(k.shader("invert", () => ({
        u_amount: b.tintAmount,
    })))

    return b
}

export default addBuilding
