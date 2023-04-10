import { states } from "../config";
import { player } from "./fabi.player";
import { setPlayerLife, gameOverModal } from "./elements";

export const bomb = {
  states: {},
  preload: (game) => {
    game.load.image('bomb', 'bomb.png')
  },
  create: (game) => {
    bomb.states.bombs = game.physics.add.group()    
  },
  hitBomb: (currentPlayer, bomb) => {
    player.states.player.setTint(0xff0000)
    player.states.life = player.states.life -10
    if (player.states.life <= 0) {
      states.gameOver = true
      gameOverModal()
    }
    setPlayerLife(player.states.life)
    setTimeout(() => {
      player.states.player.setTint(0xffffff)
    }, 250);    
  }
}