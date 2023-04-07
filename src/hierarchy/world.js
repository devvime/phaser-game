export const world = {
  states: {},
  preload: (game) => {
    game.load.image('sky', 'night-sky.png')
    game.load.image('forest', 'forest.png')
    game.load.image('ground', 'platform.png')
  },
  create: (game) => {
    game.add.image(0, 0, 'sky').setOrigin(0, 0)
    world.states.platforms = game.physics.add.staticGroup()
    world.states.platforms.create(200, 800, 'ground')
    world.states.platforms.create(1100, 800, 'ground')
    world.states.platforms.create(600, 700, 'ground')
    world.states.platforms.create(50, 600, 'ground')
    world.states.platforms.create(650, 500, 'ground')
  },
  update: (game) => {},
  getStates: () => {
    return world.states
  }
}