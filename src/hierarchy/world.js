export const world = {
  states: {},
  preload: (game) => {
    game.load.image('sky', 'sky.png')
    game.load.image('forest', 'forest.png')
    game.load.image('ground', 'platform.png')
  },
  create: (game) => {
    game.add.image(400, 300, 'forest');
    world.states.platforms = game.physics.add.staticGroup()
    world.states.platforms.create(400, 568, 'ground').setScale(2).refreshBody()
    world.states.platforms.create(600, 400, 'ground')
    world.states.platforms.create(50, 250, 'ground')
    world.states.platforms.create(750, 220, 'ground')
  },
  update: (game) => {},
  getStates: () => {
    return world.states
  }
}