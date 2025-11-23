
export const missileUserInput = k => {
    return {
        id: "missile_user_input",

        require: ["missile_guide"],

        update() {
            if (k.isButtonDown("move_right")) {
                this.axisX = 1
            } else if (k.isButtonDown("move_left")) {
                this.axisX = -1
            } else {
                this.axisX = 0
            }
        },
    }
}

const missileGuide = k => {
    return {
        id: "missile_guide",

        require: ["pos", "rotate"],

        axisX: 0,

        fixedUpdate() {
            this.moveBy(this.axisX * 100.0 * k.fixedDt(), 0)
        },
    }
}

export default missileGuide
