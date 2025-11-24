
const scene = k => {
    k.add([
        k.text("press LMB to play!", { font: "happy" }),
        k.pos(10, 500),
    ])

    k.usePostEffect("post", () => ({
        u_highcolor: k.rgb(0.47, 0.68, 0.39),
        u_lowcolor: k.rgb(0.18, 0.20, 0.11),
    }))
}

export { scene }
