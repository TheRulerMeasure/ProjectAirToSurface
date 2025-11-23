
const saucerUserInput = k => {
    return {
        id: "saucer_user_input",

        require: ["mover"],

        update() {
            if (k.isButtonDown("move_right")) {
                this.motionX = 1
            } else if (k.isButtonDown("move_left")) {
                this.motionX = -1
            } else {
                this.motionX = 0
            }

            if (k.isButtonDown("move_down")) {
                this.motionY = 1
            } else if (k.isButtonDown("move_up")) {
                this.motionY = -1
            } else {
                this.motionY = 0
            }
        },
    }
}

export default saucerUserInput
