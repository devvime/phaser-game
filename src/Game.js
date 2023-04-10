import Phaser from "phaser";
import { config, states } from './config'
import { world } from './hierarchy/world'
import { bomb } from './hierarchy/bomb'
import { star } from './hierarchy/star'
import { player } from './hierarchy/fabi.player'
import { scoreText, playerLife } from "./hierarchy/elements";

export default class Game {
  constructor() {
    new Phaser.Game(config(this))
  }
  preload() {
    this.load.setBaseURL("images/")
    world.preload(this)
    star.preload(this)
    bomb.preload(this)
    player.preload(this)
  }
  create() {    
    world.create(this)
    player.create(this)
    star.create(this)
    bomb.create(this)
    Game.setCollisions(this)
    scoreText()
    playerLife(player.states.life)
    Game.cameraConfig(this)    
  }
  update() {
    player.update(this)
  }
  static setCollisions(game) {
    game.physics.add.collider(player.states.player, world.states.platforms)
    game.physics.add.collider(star.states.stars, world.states.platforms)
    game.physics.add.overlap(player.states.player, star.states.stars, star.collectStar, null, game)
    game.physics.add.collider(bomb.states.bombs, world.states.platforms)
    game.physics.add.collider(player.states.player, bomb.states.bombs, bomb.hitBomb, null, game)
  }
  static cameraConfig(game) {
    game.cameras.main.zoom = 2
    game.cameras.main.setBounds(0, 0, config(game).width, config(game).height);
    game.cameras.main.startFollow(player.states.player)
  }
}