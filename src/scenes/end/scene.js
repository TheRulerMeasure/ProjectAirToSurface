
const scene = k => {
    const outCome = k.getData("outCome", 0)

    if (outCome >= 1) {
        k.add([
            k.text("The alien has\ndestroyed the City!", { font: "happy" }),
            k.pos(10, 400),
        ])
    } else {
        k.add([
            k.text("The alien\nhas been destroyed!", { font: "happy" }),
            k.pos(10, 400),
        ])
    }

    const backBtn = k.add([
        k.text("Press <X> to go back.", { font: "happy" }),
        k.pos(20, 550),
    ])

    backBtn.onButtonPress("shoot", () => {
        k.go("start")
    })

    k.usePostEffect("post", () => ({
        u_highcolor: k.rgb(0.47, 0.68, 0.39),
        u_lowcolor: k.rgb(0.18, 0.20, 0.11),
    }))
}

export { scene }
