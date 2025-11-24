import { DEPTH_SMOKE } from "../constants/gameconst"

const pfbSmoke = (k, pos) => ([
    k.sprite("smoke"),
    k.z(DEPTH_SMOKE),
    k.pos(pos),
    k.anchor("center"),
    {
        id: "behav_smoke",

        lifeTime: 0,

        velX: k.rand(-15, 15),

        fixedUpdate() {
            this.moveBy(this.velX * k.fixedDt(), -20 * k.fixedDt())

            this.lifeTime += k.fixedDt()
            if (this.lifeTime > 5) {
                this.destroy()
            }
        },
    },
])

const pfbSmokePlace = (k, pos) => ([
    k.pos(pos),
    {
        id: "behav_smoke_place",

        smokeDelay: 0.25,

        fixedUpdate() {
            this.smokeDelay -= k.fixedDt()
            if (this.smokeDelay <= 0) {
                this.smokeDelay = 0.6
                k.add(pfbSmoke(k, this.pos))
            }
        },
    },
])

const addSmokePlace = (k, pos) => {
    k.add(pfbSmokePlace(k, pos))
}

export default addSmokePlace
