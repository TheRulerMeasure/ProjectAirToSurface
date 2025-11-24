import addBuilding from "../../actors/building"
import lifeTime from "../../actors/lifetime"
import addMissile from "../../actors/missile"
import saucerSpawner from "../../actors/saucerspawner"
import spriteLine from "../../actors/spriteline"
import { GAME_HEIGHT, GAME_WIDTH } from "../../constants/gameconst"
import addSaucerBlocker from "../../statics/walls"
import { game as compGame } from "./game"

const scene = k => {
    k.add([
        k.text("Begin!", { font: "happy" }),
        k.pos(GAME_WIDTH * 0.5, GAME_HEIGHT * 0.5),
        k.anchor("center"),
        lifeTime(k, 1.5),
        k.layer("ui"),
    ])

    const objGame = k.add([
        compGame(k),
    ])

    const objGameTime = k.add([
        k.text("1000", { font: "happy" }),
        k.pos(GAME_WIDTH * 0.7, 50),
        {
            id: "game_time",

            gameT: 100,

            fixedUpdate() {
                this.gameT -= k.fixedDt()

                this.text = Math.max(Math.ceil(this.gameT), 0)

                if (this.gameT <= 0) {
                    this.trigger("timeout")
                    this.destroy()
                }
            },
        },
        k.layer("ui"),
    ])

    objGameTime.on("timeout", () => {
        objGame.onSpawnerRanOut()
    })

    const spriteLives = k.add([
        k.pos(50, 50),
        spriteLine(k, "saucer_life"),
        k.layer("ui"),
    ])

    const spawner = k.add([
        saucerSpawner(k),
    ])

    spawner.on("lives_changed", lives => {
        spriteLives.setSpritesAmount(lives)
    })
    spawner.on("lives_emptied", () => {
        objGame.onSpawnerRanOut()
    })
    objGame.on("game_started", () => {
        spawner.unlockGun()
    })

    addSaucerBlocker(k)

    const buildingManager = k.add([
        {
            id: "building_manager",

            maxBuildings: 8,
            buildingsLeft: 8,

            add() {
                for (let i = 0; i < this.maxBuildings; i++) {
                    const b = addBuilding(k, k.vec2(10 + 70 * i, GAME_HEIGHT))
                    b.onDeath(() => {
                        this.onBuildingDied()
                    })
                }
            },

            onBuildingDied() {
                this.buildingsLeft--
                if (this.buildingsLeft <= 0) {
                    this.trigger("all_destroyed")
                }
            },
        },
    ])

    buildingManager.on("all_destroyed", () => {
        objGame.onBuildingAllDestroyed()
    })

    const rocketLauncher = k.add([
        {
            id: "rocket_launcher",

            launchDelay: 2,
            launchDisabled: true,

            fixedUpdate() {
                if (this.launchDisabled) {
                    return
                }

                this.launchDelay -= k.fixedDt()
                if (this.launchDelay <= 0) {
                    this.launchDelay = 2
                    const m = addMissile(k, k.vec2(k.rand(0, GAME_WIDTH), GAME_HEIGHT))

                    const ev1 = this.on("destroy_rocket_all", () => {
                        m.destroy()
                        console.log("destroy missile")
                    })
                    m.onDestroy(() => {
                        ev1.cancel()
                    })
                }
            },

            destroyAllRockets() {
                this.trigger("destroy_rocket_all")
            },
        },
    ])

    objGame.on("game_started", () => {
        rocketLauncher.launchDisabled = false
    })
    objGame.on("player_won", () => {
        rocketLauncher.launchDisabled = true
        rocketLauncher.destroyAllRockets()
    })

    k.usePostEffect("post", () => ({
        u_highcolor: k.rgb(0.47, 0.68, 0.39),
        u_lowcolor: k.rgb(0.18, 0.20, 0.11),
    }))
}

export { scene }
