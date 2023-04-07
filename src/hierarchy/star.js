import { states } from "../config";
import { bomb } from "./bomb";
import { setScore } from "./elements";

export const star = {
  states: {},
  preload: (game) => {
    game.load.image('star', 'star.png');
  },
  create: (game) => {
    star.states.stars = game.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })
    star.states.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    })
  },
  collectStar: (player, currentStar) => {
    currentStar.disableBody(true, true)
    states.score = states.score + 10
    setScore(states.score)

    if (star.states.stars.countActive(true) === 0) {
      star.states.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true)
      })
      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
      let bombItem = bomb.states.bombs.create(x, 16, 'bomb')
      bombItem.setBounce(1)
      bombItem.setCollideWorldBounds(true)
      bombItem.setVelocity(Phaser.Math.Between(-200, 200), 20)
    }
  }
}