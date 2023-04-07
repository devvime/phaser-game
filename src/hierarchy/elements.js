import { states } from "../config"

export const scoreText = () => {
    const score = document.createElement('p')
    score.textContent = 'Score: 0'
    score.classList.add('score')
    document.body.appendChild(score)
    return score
}

export const setScore = (value) => {
    document.querySelector('.score').textContent = `Score: ${value}`
}

export const playerLife = (value) => {
    const life = document.createElement('input')
    life.setAttribute('type', 'range')
    life.classList.add('life')
    life.value = value
    document.body.appendChild(life)
    return life
}

export const setPlayerLife = (value) => {
    document.querySelector('.life').value = value
}

export const gameOverModal = () => {
    const gameOverModal = document.createElement('div')
    gameOverModal.classList.add('game-over-modal')
    gameOverModal.innerHTML = `
        <h1>Game Over</h1>
        <button onclick='location.reload()'>Restart</button>
    `
    document.body.appendChild(gameOverModal)
    return gameOverModal
}