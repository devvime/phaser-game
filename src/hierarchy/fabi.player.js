import { states } from "../config";

export const player = {
  states: {
    velocity: 350,
    jumpVelocity: -350,
    death: false,
    life: 100,
    position: { x: 0, y: 0 },
    attack: false,
    inputs: {
      w: { isDown: false },
      a: { isDown: false },
      s: { isDown: false },
      d: { isDown: false },
      space: { isDown: false }
    }
  },
  preload: (game) => {
    game.load.spritesheet('player',
      'player.png',
      { frameWidth: 64, frameHeight: 44 }
    );
  },
  create: (game) => {
    player.states.player = game.physics.add.sprite(100, 700, 'player')
    player.states.player.body.setGravityY(180)
    player.states.player.setBounce(0)
    player.states.player.setCollideWorldBounds(true)
    player.states.player.body.maxVelocity.x = 200;
    player.states.player.body.maxVelocity.y = 500;
    player.states.player.setScale(2).refreshBody();
    player.states.player.setSize(21, 34).setOffset(17, 9);
    player.animations(game)
    player.inputs(game)
  },
  update: (game) => {
    player.controller(game)
    player.states.position = player.states.player.body.position
  },
  animations: (game) => {
    game.anims.create({
      key: 'idle',
      frames: game.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    })
    game.anims.create({
      key: 'left',
      frames: game.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    })    
    game.anims.create({
      key: 'right',
      frames: game.anims.generateFrameNumbers('player', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1
    })
    game.anims.create({
      key: 'jump',
      frames: game.anims.generateFrameNumbers('player', { start: 14, end: 16 }),
      frameRate: 10,
      repeat: -1
    })
    game.anims.create({
      key: 'fall',
      frames: game.anims.generateFrameNumbers('player', { start: 17, end: 19 }),
      frameRate: 10,
      repeat: -1
    })
    game.anims.create({
      key: 'death',
      frames: game.anims.generateFrameNumbers('player', { start: 20, end: 30 }),
      frameRate: 10,
      repeat: -1
    })
    game.anims.create({
      key: 'dead',
      frames: [{ key: 'player', frame: 30 }],
      frameRate: 20
    })
    game.anims.create({
      key: 'attack',
      frames: game.anims.generateFrameNumbers('player', { start: 31, end: 42 }),
      frameRate: 20
    })
  },
  controller: (game) => {
    player.states.cursors = game.input.keyboard.createCursorKeys()
    if (states.gameOver) {      
      player.death(game)
      return
    } else if (player.states.player.body.velocity.y < 0) {
      // play jump animation
      player.states.player.anims.play('jump', true)
    } else if (player.states.player.body.velocity.y > 0) {
      // play fall animation
      player.states.player.anims.play('fall', true)
    } else if (player.states.inputs.a.isDown && player.states.inputs.space.isDown) {
      // attack
      player.states.player.setVelocityX(0)
      player.states.player.anims.play('attack', true)
    } else if (player.states.inputs.a.isDown) {
      // run left
      player.states.player.flipX = true
      player.states.player.setOffset(27, 9)
      player.states.player.setVelocityX(-player.states.velocity)
      player.states.player.anims.play('left', true)
    } else if (player.states.inputs.d.isDown && player.states.inputs.space.isDown) {
      // attack
      player.states.player.setVelocityX(0)
      player.states.player.anims.play('attack', true)
    } else if (player.states.inputs.d.isDown) {
      // run right
      player.states.player.flipX = false
      player.states.player.setOffset(17, 9)
      player.states.player.setVelocityX(player.states.velocity)
      player.states.player.anims.play('right', true)
    } else if (player.states.inputs.space.isDown) {
      // attack
      player.states.player.anims.play('attack', true)
    } else {
      // play idle animation
      player.states.player.setVelocityX(0)
      player.states.player.anims.play('idle', true)      
    }
    if (player.states.inputs.w.isDown && player.states.player.body.touching.down) {
      // start jump
      player.states.player.setVelocityY(-330);
    }     
  },
  death: (game) => {
    if (player.states.death) {
      player.states.player.anims.play('dead')      
    } else {
      player.states.player.setVelocityX(0)
      if (player.states.player.flipX) {
        player.states.player.setSize(39, 8).setOffset(23, 35);
      } else {
        player.states.player.setSize(39, 8).setOffset(1, 35);
      }
      player.states.player.anims.play('death', true)
      player.states.player.on('animationrepeat', function () {
        player.states.death = true
      }, game)
    }
  },
  inputs: (game) => {
    document.addEventListener('keydown', (e) => {      
      player.setInputs(e.key, true)
    })
    document.addEventListener('keyup', (e) => {
      player.setInputs(e.key, false)
    })
  },
  setInputs: (key, value) => {
    switch (key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
        player.states.inputs.w.isDown = value
        break
      case'a':
      case'A':
      case'ArrowLeft':
        player.states.inputs.a.isDown = value
      break
      case's':
      case'S':
      case'ArrowDown':
        player.states.inputs.s.isDown = value
      break
      case'd':
      case'D':
      case'ArrowRight':
        player.states.inputs.d.isDown = value
      break
      case' ':
        player.states.inputs.space.isDown = value
      break
    }
  }
}