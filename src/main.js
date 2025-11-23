import kaplay from "kaplay"
import mover from "./actors/mover"
import saucerUserInput from "./actors/saucer"

const k = kaplay({
    width: 600,
    height: 800,

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
        }
    },

    focus: false,

    maxFPS: 120,
    global: false,

    background: "000000",

    debugKey: 'k'
})

k.loadRoot("./")
k.loadSprite("bean", "sprites/bean.png")
k.loadSprite("saucer", "sprites/saucer.png")
k.loadSprite("missile", "sprites/missile.png")
k.loadSprite("building", "sprites/building.png")

k.scene("game", () => {

    k.add([
        k.pos(100, 100),
        k.anchor("center"),
        k.area(),
        k.body(),
        k.sprite("saucer"),
        mover(k),
        saucerUserInput(k),
    ])

    for (let i = 0; i < 5; i++) {
        k.add([
            k.pos(10 + 64 * i, 800),
            k.anchor("botleft"),
            k.sprite("building"),
        ])
    }
})

k.onLoad(() => k.go("game"))
