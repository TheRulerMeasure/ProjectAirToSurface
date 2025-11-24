
const invc = (k, duration = 2.2) => {
    let t = duration

    return {
        id: "invincible",

        canTakeDamage: false,

        fixedUpdate() {
            t = Math.max(t - k.fixedDt(), 0)
            if (t <= 0) {
                this.canTakeDamage = true
                if (this.has("opacity")) {
                    this.opacity = 1
                }
            } else {
                if (this.has("opacity")) {
                    this.opacity = (Math.sin(t * 50) + 1) * 0.5
                }
            }
        },
    }
}

export default invc
