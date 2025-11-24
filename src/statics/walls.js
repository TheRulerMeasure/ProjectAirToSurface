import { GAME_HEIGHT, GAME_WIDTH } from "../constants/gameconst"

const addSaucerBlocker = k => {
    k.add([
        k.pos(0, 10),
        k.rect(10, GAME_HEIGHT * 0.7),
        k.opacity(0),
        k.area(),
        k.body({ isStatic: true }),
    ])

    k.add([
        k.pos(GAME_WIDTH - 10, 10),
        k.rect(10, GAME_HEIGHT * 0.7),
        k.opacity(0),
        k.area(),
        k.body({ isStatic: true }),
    ])

    k.add([
        k.pos(10, 0),
        k.rect(GAME_WIDTH - 20, 10),
        k.opacity(0),
        k.area(),
        k.body({ isStatic: true }),
    ])

    k.add([
        k.pos(10, GAME_HEIGHT * 0.7 + 10),
        k.rect(GAME_WIDTH - 20, 10),
        k.opacity(0),
        k.area(),
        k.body({ isStatic: true }),
    ])
}

export default addSaucerBlocker
