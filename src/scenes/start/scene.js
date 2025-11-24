
const compMenu = k => ({
    id: "menu",

    maxBtn: 2,
    curBtn: 0,

    volumes: [
        10,
        10,
    ],

    objSelection: null,

    objVals: [],

    add() {
        k.add([
            k.text("SFX", { font: "happy" }),
            k.pos(120, 300),
        ])

        this.objVals.push(k.add([
            k.text("10%", { font: "happy" }),
            k.pos(280, 300),
        ]))

        k.add([
            k.text("BGM", { font: "happy" }),
            k.pos(120, 360),
        ])
    
        this.objVals.push(k.add([
            k.text("10%", { font: "happy" }),
            k.pos(280, 360),
        ]))

        this.objSelection = k.add([
            k.text("<          >", { font: "happy" }),
            k.pos(90, 300),
        ])

        k.add([
            k.text("Press <Left Mouse Button> to start!"),
            k.pos(10, 600),
        ])

        k.setData("sfx_volume", this.volumes[0] * 0.01)
        k.setData("bgm_volume", this.volumes[1] * 0.01)
        // musik.volume = this.volumes[1] * 0.01
    },

    nextBtn() {
        this.curBtn++
        if (this.curBtn >= this.maxBtn) {
            this.curBtn = 0
        }
        this.objSelection.moveTo(90, 300 + 60 * this.curBtn)
        k.play("ui_nav", { volume: k.getData("sfx_volume") })
    },

    prevBtn() {
        this.curBtn--
        if (this.curBtn < 0) {
            this.curBtn = this.maxBtn - 1
        }
        this.objSelection.moveTo(90, 300 + 60 * this.curBtn)
        k.play("ui_nav", { volume: k.getData("sfx_volume") })
    },

    valueDown() {
        this.volumes[this.curBtn] = Math.max(this.volumes[this.curBtn] - 10, 0)
        this.objVals[this.curBtn].text = this.volumes[this.curBtn] + "%"

        if (this.curBtn == 0) {
            k.setData("sfx_volume", this.volumes[this.curBtn] * 0.01)
        } else if (this.curBtn == 1) {
            k.setData("bgm_volume", this.volumes[this.curBtn] * 0.01)
            // musik.volume = this.volumes[this.curBtn] * 0.01
        }
        
        k.play("ui_nav", { volume: k.getData("sfx_volume") })
    },

    valueUp() {
        this.volumes[this.curBtn] = Math.min(this.volumes[this.curBtn] + 10, 100)
        this.objVals[this.curBtn].text = this.volumes[this.curBtn] + "%"

        if (this.curBtn == 0) {
            k.setData("sfx_volume", this.volumes[this.curBtn] * 0.01)
        } else if (this.curBtn == 1) {
            k.setData("bgm_volume", this.volumes[this.curBtn] * 0.01)
            // musik.volume = this.volumes[this.curBtn] * 0.01
        }

        k.play("ui_nav", { volume: k.getData("sfx_volume") })
    },
})

const scene = k => {

    const menu = k.add([
        compMenu(k),
    ])
    menu.onButtonPress([ "move_left", "move_right", "move_up", "move_down" ], btn => {
        if (btn == "move_left") {
            menu.valueDown()
        } else if (btn == "move_right") {
            menu.valueUp()
        } else if (btn == "move_up") {
            menu.prevBtn()
        } else if (btn == "move_down") {
            menu.nextBtn()
        }
    })

    k.usePostEffect("post", () => ({
        u_highcolor: k.rgb(0.47, 0.68, 0.39),
        u_lowcolor: k.rgb(0.18, 0.20, 0.11),
    }))
}

export { scene }
