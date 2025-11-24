
const lifeTime = (k, sec) => {
    let t = 0

    return {
        id: "lifetime",

        maxLifeTime: sec,

        fixedUpdate() {
            t += k.fixedDt()
            if (t >= this.maxLifeTime) {
                this.destroy()
            }
        },
    }
}

export default lifeTime
