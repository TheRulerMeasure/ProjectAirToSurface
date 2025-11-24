import kaplay from "kaplay"
import { GAME_HEIGHT, GAME_WIDTH } from "./constants/gameconst"
import { scene as sceneGame } from "./scenes/game/scene"
import { scene as sceneStart } from "./scenes/start/scene"
import { scene as sceneEnd } from "./scenes/end/scene"

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
            // mouse: "left",
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

k.loadSound("ui_nav", "sounds/uiNav.wav")
k.loadSound("sound_select", "sounds/blipSelect.wav")
k.loadSound("sound_ship_explode", "sounds/shipExplosion.wav")
k.loadSound("sound_laser", "sounds/laserShoot.wav")
k.loadSound("sound_hit", "sounds/buildingHit.wav")

// k.loadMusic("music_a", "music/LazToBuildin.wav")

k.setLayers(["bg", "obj", "ui"], "obj")

k.setData("sfx_volume", 0)
k.setData("bgm_volume", 0)

k.scene("start", () => sceneStart(k))
k.scene("game", () => sceneGame(k))
k.scene("end", () => sceneEnd(k))

k.onLoad(() => {
    // musik = k.play("music_a", { loop: true })

    k.go("start")
})
