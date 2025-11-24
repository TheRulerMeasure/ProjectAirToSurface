
const flasher = (k, rate = 40) => {
    return {
        id: "flasher",

        flashRate: rate,
        flashTime: 0,
        tintAmount: 0,

        update() {
            this.flashTime = Math.max(this.flashTime - k.dt(), 0)
            if (this.flashTime > 0) {
                this.tintAmount = (Math.sin(this.flashTime * this.flashRate) + 1) * 0.5
            } else {
                this.tintAmount = 0
            }
        },

        startFlash(duration = 0.4) {
            this.flashTime = duration
        },
    }
}

export default flasher
