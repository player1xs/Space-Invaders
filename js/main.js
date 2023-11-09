
// SELECTAAAAAAAAA!! ------------------------------------------------------------------------------

const grid = document.querySelector('.the-grid')

const livesDisplay = document.querySelector('#life')

const scoreDisplay = document.querySelector('#score')

const hiScoreDisplay = document.querySelector('#hi-score')

const startDiv = document.getElementById('start')

const gameOverDiv = document.getElementById('game-over')

const resetBtn = document.getElementById('reset')


// // OTHER VAR
let gameOn = false
let score = 0
let lives = 3
let direction = 1
let gameInterval

// // START GAME / END ---------------------------------------------------------------------------------
function resetGame() {
  clearInterval(gameInterval)
  score = 0
  scoreDisplay.innerText = score
  lives = 3
  livesDisplay.innerText = 'XXX' // change to my avatar
}

const battlemusic = new Audio('../sounds/HAPPY STAR WARS DAY Imperial March (Williams) - Mega Man Style 8-Bit Remix (128kbps).mp3')
battlemusic.volume = 0.1

function startGame(evt) {
  
  if (!gameOn){
    resetGame()
    gameOn = true
    startDiv.style.display = 'none'
    grid.style.display = 'block'
    gameOverDiv.style.display = 'none'
    gameInterval = setInterval(() => {
      moveInvaders1()
    }, 150)
  } 
  battlemusic.play()
}

function gameOver(evt) {
  const awardMusic = new Audio('../sounds/Star Wars Throne Room Theme (2022) [8 Bit Tribute to John Williams] - 8 Bit Universe (128kbps).mp3')
  awardMusic.volume = 0.1
  startDiv.style.display = 'none'
  grid.style.display = 'none'
  gameOverDiv.style.display = 'block'
  gameOn = false
  battlemusic.pause()
  battlemusic.currentTime = 0
  awardMusic.play()
  scoreDisplay.textContent = score
}

function resetPage(){
  if (gameOn === true) {
    location.reload()
  }
  gameOn = true
}

resetBtn.addEventListener('click', resetPage)

// // GRID -------------------------------------------------------------------------------------------
const cells = []
const width = 40
const height = 20
const cellCount = width * height

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.id = i
    cell.style.width = `${100 / width}%`
    grid.append(cell)
    cells.push(cell)
  }
  addPlayer()
  addInvaders1()
}

// // PLAYER -------------------------------------------------------------------------------------
// create
let currentIndexPlayer = 739
function addPlayer() {
  cells[currentIndexPlayer].classList.add('player')
}

function removePlayer(){
  cells[currentIndexPlayer].classList.remove('player')
}

//move
function movePlayer(evt) {
  removePlayer()
  switch (evt.keyCode) {
    case 37:
      if (currentIndexPlayer % width !== 0) currentIndexPlayer -= 1
      break
    case 39:
      if (currentIndexPlayer % width < width - 1) currentIndexPlayer += 1
  }
  addPlayer()
}
document.addEventListener('keydown', movePlayer)

// // INVADER -----------------------------------------------------------------------------------
let currentIndexInvader = 0
let killedInvaders = []


// create
let invaders1 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91
]

function addInvaders1() {
  const filteredInvaders = invaders1.filter((item, index) => !killedInvaders.includes(index))
  filteredInvaders.forEach(invader => cells[currentIndexInvader + invader].classList.add('invader1'))
}

function removeInvaders1() {
  invaders1.forEach(invader => cells[currentIndexInvader + invader].classList.remove('invader1'))
}


//move 
function moveInvaders1(){
  const leftWall = invaders1[0] % width === 0
  const rightWall = invaders1[invaders1.length - 1] % width === width - 1

  if ((leftWall && direction === -1) || (rightWall && direction === 1)){
    direction = width
  } else if (direction === width){
    if (leftWall) direction = 1
    else direction = -1
  }
  for (let i = 0; i <= invaders1.length - 1; i++){
    removeInvaders1()
  }
  for (let i = 0; i <= invaders1.length - 1; i++){
    invaders1[i] += direction
  }
  addInvaders1()
    

  // GAME OVER SCENARIO #1
  if (cells[currentIndexPlayer].classList.contains('invader1', 'player')) {
    //display Game Over
    cells[currentIndexPlayer].classList.add('boom')
    clearInterval(gameInterval)
    gameOver()
  }

  for (let i = 0; i <= invaders1.length - 1; i++){
    if (invaders1[i] > (cells.length - (width - 1))) {
      //display Game Over
      clearInterval(gameInterval)
    }
  }
}



// // PEW PEW PEW PEW PEW --------------------------------------------------------------
// Player shoot


function pewPewPew(evt) {
  let laserId
  let currentIndexLaser = currentIndexPlayer
  const pewSound = new Audio('../sounds/shoot.wav')
  pewSound.volume = 0.2
  const boomSound = new Audio('../sounds/invaderkilled.wav')
  boomSound.volume = 0.2

  function movePewPew() {
    cells[currentIndexLaser].classList.remove('pew')
    currentIndexLaser -= width
    cells[currentIndexLaser].classList.add('pew')
    
    if (cells[currentIndexLaser].classList.contains('invader1')) {
      cells[currentIndexLaser].classList.remove('pew')
      cells[currentIndexLaser].classList.remove('invader1')
      cells[currentIndexLaser].classList.add('boom')
      boomSound.play()

      //remove boom
      setTimeout(() => cells[currentIndexLaser].classList.remove('boom'), 300)
      clearInterval(laserId)

      //add score
      const invaderKill = invaders1.indexOf(currentIndexLaser)
      killedInvaders.push(invaderKill)
      score++
      scoreDisplay.innerText = score
    }


    //remove laser from ceiling
    if (currentIndexLaser < width) {
      clearInterval(laserId)
      setTimeout(() => cells[currentIndexLaser].classList.remove('pew'), 100)
    }
  }
  switch (evt.keyCode) {
    case 88:
      laserId = setInterval(movePewPew, 100, pewSound.play())
      break
  }
  if (killedInvaders.length === invaders1.length) {
    battlemusic.pause()
    battlemusic.currentTime = 0
    currentIndexInvader = 0
    killedInvaders = []
    invaders1 = [
      28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
      108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119
    ]
    addInvaders1()
    gameInterval = setInterval(() => {
      moveInvaders1()
    }, 90)
    battlemusic.play()
  }
}

document.addEventListener('keyup', pewPewPew)

// Invader shoot

// function alienPewPew(evt) {
  
//   const ranInv = Math.floor(Math.random() * invaders1.length)
//   let currentAlienLaser = invaders1[ranInv]

//   function movePewPew() {
//     cells[currentAlienLaser].classList.remove('pewInv')
//     currentAlienLaser += width
//     cells[currentAlienLaser].classList.add('pewInv')
    
//     if (cells[currentAlienLaser].classList.contains('player')) {
//       cells[currentAlienLaser].classList.remove('pewInv')
//       lives -= 1
//       livesDisplay.innerText = lives
//       //Endgame scenario # 3
//       if (lives === 0) {
//         gameOver()
//       }
//       clearInterval(invLaserInterval)
//     }
    
//     //remove laser from floor
//     if (currentAlienLaser > width) {
//       clearInterval(invLaserInterval)
//       setTimeout(() => cells[currentAlienLaser].classList.remove('pewInv'), 100)
//     }
//   }
//   movePewPew()
// }

// let invLaserInterval
// function startShootingBack() {
//   invLaserInterval = setInterval(() => {
//     alienPewPew()
//   }, 300)
// }

// startShootingBack()


// // WIN SCENARIO NEW ENEMY ----------------------------------------------------------------



createGrid()