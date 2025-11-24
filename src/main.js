import kaplay from "kaplay"
import addMissile from "./actors/missile"
import { GAME_HEIGHT, GAME_WIDTH } from "./constants/gameconst"
import addBuilding from "./actors/building"
import addSaucer from "./actors/saucer"
import spriteLine from "./actors/spriteline"

const fragPost = `

uniform vec3 u_highcolor;
uniform vec3 u_lowcolor;

vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
    vec4 c = def_frag();
    vec3 rgb = mix(u_lowcolor, u_highcolor, step(0.5, c.r));
    return vec4(rgb, 1.0);
}
`

const fragInvert = `

uniform float u_amount;

vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
    vec4 c = def_frag();
    return mix(c, vec4(1.0 - c.r, 1.0 - c.g, 1.0 - c.b, c.a), u_amount);
}
`

const k = kaplay({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,

    letterbox: true,
    crisp: true,
    texFilter: "nearest",

    buttons: {
        move_left: {
            keyboard: [ "a", "left" ],
            gamepad: "west",
        },

        move_right: {
            keyboard: [ "d", "right" ],
            gamepad: "east",
        },

        move_up: {
            keyboard: [ "w", "up" ],
            gamepad: "north",
        },

        move_down: {
            keyboard: [ "s", "down" ],
            gamepad: "south",
        },

        shoot: {
            keyboard: [ "x", "j" ],
            gamepad: "rtrigger",
            mouse: "left",
        },
    },

    focus: true,
    tagComponentIds: true,

    maxFPS: 120,
    global: false,

    background: "000000",

    debugKey: 'p',
})

k.loadRoot("./")

k.loadSprite("bean", "sprites/bean.png")
k.loadSprite("saucer", "sprites/saucer.png")
k.loadSprite("missile", "sprites/missile.png")
k.loadSprite("laser", "sprites/laser.png")
k.loadSprite("smoke", "sprites/smoke.png")
k.loadSprite("smoke_small", "sprites/smoke_small.png")
k.loadSprite("saucer_life", "sprites/saucer_life.png")

k.loadSprite("building_sheet", "sprites/building_sheet.png", {
    sliceX: 4,
    sliceY: 1,
})
k.loadSprite("explode_sheet", "sprites/explode_sheet.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        explode: {
            from: 0,
            to: 4,
            loop: false,
            speed: 8,
        },
    },
})

k.loadBitmapFont("happy", "sprites/happy.png", 28, 37, {
    chars: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
})

k.loadShader("invert", null, fragInvert)
k.loadShader("post", null, fragPost)

k.setLayers(["bg", "obj", "ui"], "obj")

k.scene("game", () => {
    const spriteLives = k.add([
        k.pos(50, 50),
        spriteLine(k, "saucer_life"),
        k.layer("ui"),
    ])

    const saucerSpawner = k.add([
        {
            id: "saucer_spawner",

            lives: 5,

            spawnDelay: 1,

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

                saucer.onDeath(() => {
                    this.spawnDelay = 1
                    this.hasSaucer = false
                    this.lives--
                    this.trigger("lives_changed", this.lives)
                })
            },
        },
    ])

    saucerSpawner.on("lives_changed", (lives) => {
        spriteLives.setSpritesAmount(lives)
    })

    for (let i = 0; i < 8; i++) {
        addBuilding(k, k.vec2(10 + 70 * i, GAME_HEIGHT))
    }

    const rocketLauncher = k.add([ k.timer() ])
    rocketLauncher.loop(2, () => {
        const x = k.rand(0, GAME_WIDTH)
        addMissile(k, k.vec2(x, GAME_HEIGHT))
    })

    k.usePostEffect("post", () => ({
        u_highcolor: k.rgb(0.47, 0.68, 0.39),
        u_lowcolor: k.rgb(0.18, 0.20, 0.11),
    }))
})

k.onLoad(() => k.go("game"))
