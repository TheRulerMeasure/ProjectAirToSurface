import { GAME_WIDTH } from "../constants/gameconst"
import addSaucer from "./saucer"

const saucerSpawner = k => ({
    id: "saucer_spawner",

    lives: 5,

    spawnDelay: 1,

    gunUnlocked: false,
    hasSaucer: false,

    fixedUpdate() {
        if (this.hasSaucer) {
            return
        }
        if (this.lives <= 0) {
            return
        }
        this.spawnDelay -= k.fixedDt()
        if (this.spawnDelay <= 0) {
            this.putSaucer()
        }
    },

    putSaucer() {
        if (this.lives <= 0) {
            return
        }
        this.hasSaucer = true

        const saucer = addSaucer(k, k.vec2(GAME_WIDTH * 0.5, 100))

        saucer.gunLocked = !this.gunUnlocked

        this.on("gun_unlocked", () => {
            saucer.gunLocked = false
        })

        saucer.onDeath(() => {
            this.spawnDelay = 1
            this.hasSaucer = false
            this.lives--
            this.trigger("lives_changed", this.lives)
            if (this.lives <= 0) {
                this.trigger("lives_emptied")
            }
        })
    },

    unlockGun() {
        this.gunUnlocked = true
        this.trigger("gun_unlocked")
    },
})

export default saucerSpawner
