
const spriteLine = (k, sprite, offsetX = 42, offsetY = 0, maxSprites = 5, initialAmount = 5) => {
    return {
        id: "sprite_line",

        curSprites: initialAmount,
        maxSprites: maxSprites,

        sprites: [],

        add() {
            for (let i = 0; i < this.maxSprites; i++) {
                const sp = this.add([
                    k.sprite(sprite),
                    k.pos(i * offsetX, i * offsetY),
                ])
                sp.hidden = true
                this.sprites.push(sp)
            }
            for (let i = 0; i < this.curSprites; i++) {
                this.sprites[i].hidden = false
            }
        },

        setSpritesAmount(n) {
            this.curSprites = k.clamp(Math.floor(n), 0, this.maxSprites)
            
            for (let i = 0; i < this.maxSprites; i++) {
                this.sprites[i].hidden = true
            }

            for (let i = 0; i < this.curSprites; i++) {
                this.sprites[i].hidden = false
            }
        },
    }
}

const pfbSpriteLine = (k, pos, sprite) => ([
    k.pos(pos),
    spriteLine(k, sprite),
])

export { pfbSpriteLine }
export default spriteLine
