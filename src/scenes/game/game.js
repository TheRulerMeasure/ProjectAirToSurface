
const GAME_BEGIN = 0
const GAME_NORMAL = 1
const GAME_END = 2

const game = k => {
    return {
        id: "scene_game",

        gameCurState: GAME_BEGIN,
        gameStateTime: 0,

        playerSpawnerIsEmpty: false,
        buildingsAllDestroyed: false,

        fixedUpdate() {
            let newState

            if (this.gameCurState == GAME_NORMAL) {
                newState = this.updateGameNormal()
            } else if (this.gameCurState == GAME_END) {
                newState = this.updateGameEnd()
            } else {
                newState = this.updateGameBegin()
            }

            if (newState != this.gameCurState) {
                this.gameStateTime = 0
            } else {
                this.gameStateTime = Math.min(this.gameStateTime + k.fixedDt(), 9999)
            }

            this.gameCurState = newState
        },

        updateGameBegin() {
            if (this.gameStateTime >= 2) {
                this.trigger("game_started")
                return GAME_NORMAL
            }
            return GAME_BEGIN
        },

        updateGameNormal() {
            if (this.playerSpawnerIsEmpty) {
                this.trigger("player_lost")
                k.setData("outCome", 0)
                return GAME_END
            }
            if (this.buildingsAllDestroyed) {
                this.trigger("player_won")
                k.setData("outCome", 1)
                return GAME_END
            }
            return GAME_NORMAL
        },

        updateGameEnd() {
            if (this.gameStateTime > 3) {
                k.go("end")
            }
            return GAME_END
        },

        onSpawnerRanOut() {
            this.playerSpawnerIsEmpty = true
        },

        onBuildingAllDestroyed() {
            this.buildingsAllDestroyed = true
        },
    }
}

export { game }
