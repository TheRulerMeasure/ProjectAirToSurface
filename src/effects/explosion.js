import lifeTime from "../actors/lifetime"
import { DEPTH_EXPLOSION } from "../constants/gameconst"

const pfbExplosion = (k, pos) => ([
    k.sprite("explode_sheet", { anim: "explode" }),
    k.z(DEPTH_EXPLOSION),
    k.pos(pos),
    k.anchor("center"),
    lifeTime(k, 0.7),
])

export default pfbExplosion
