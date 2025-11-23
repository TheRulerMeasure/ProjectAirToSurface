import kaplay from "kaplay"
import mover from "./actors/mover"
import saucerUserInput, { saucerGun } from "./actors/saucer"
import addMissile from "./actors/missile"
import { GAME_HEIGHT, GAME_WIDTH } from "./constants/gameconst"

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

    focus: false,
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
k.loadSprite("building", "sprites/building.png")

k.scene("game", () => {

    const saucer = k.add([
        k.pos(100, 100),
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
        k.sprite("saucer"),
        mover(k),
        saucerGun(k),
        saucerUserInput(k),
        "saucer",
    ])
    saucer.collisionIgnore = [ "laser" ]

    for (let i = 0; i < 5; i++) {
        k.add([
            k.sprite("building"),
            k.pos(10 + 64 * i, GAME_HEIGHT),
            k.anchor("botleft"),
            k.area(),
            "building",
        ])
    }

    const rocketLauncher = k.add([ k.timer() ])
    rocketLauncher.loop(2, () => {
        const x = k.rand(0, GAME_WIDTH)
        // const x = 300
        addMissile(k, k.vec2(x, GAME_HEIGHT))
    })
    
})

k.onLoad(() => k.go("game"))
