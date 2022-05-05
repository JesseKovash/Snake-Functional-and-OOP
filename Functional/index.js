window.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById('snake_canvas');
  const ctx = canvas.getContext('2d');

  const width = 400;
  const height = 400;
  let snake = [{x: 30, y: 30}, {x: 40, y: 30}, {x: 50, y: 30}, {x: 60, y: 30}];
  let food = {};
  let xDirection = 10;
  let yDirection = 0;
  let gameEnded = false;
  let changedDirection = false;

  const drawCanvas = function() {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeRect(0, 0, width, height);
  }

  const makeFood = function() {
    food = {x: changeFoodPosition(), y: changeFoodPosition()}
    drawFood()

  }

  const changeFoodPosition = function() {
    return Math.floor((Math.random() * (390 - 0) + 0) / 10) * 10
  }

  const drawFood = function() {
    for (var j=0; j < snake.length; j++) {
      let currentPart = snake[j];
      if (food.x === currentPart.x && food.y === currentPart.y) {
        makeFood()
        break;
      }
    }
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'black';
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.strokeRect(food.x, food.y, 10, 10);
  }

  const moveSnake = function() {
    snake.unshift({x: snake[0].x + xDirection, y: snake[0].y + yDirection});

    if (snake[0].x !== food.x || snake[0].y !== food.y) {
      snake.pop()
    }

    isGameEnded()
  }

  const drawSnake = function() {
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'black';
    snake.forEach((onePart)=> {
      ctx.fillRect(onePart.x, onePart.y, 10, 10);
      ctx.strokeRect(onePart.x, onePart.y, 10, 10)
    })
  }

  const isGameEnded = function() {
    if (snake[0].x > 390 || snake[0].x < 0 || snake[0].y < 0 || snake[0].y > 390) {
      gameEnded = true;
      return true
    }

    for (var k=4; k < snake.length; k++) {
      let snakePart = snake[k];
      if (snake[0].x == snakePart.x && snake[0].y == snakePart.y) {
        gameEnded = true
        return true
      }
    }
    return false
  }

  const directionChange = function(event) {
    let key = event.keyCode;
    if(changedDirection) {
      return
    }

    if (key === 37 && xDirection === 0) {
      xDirection = -10;
      yDirection = 0;
    } else if (key === 38 && yDirection === 0) {
      yDirection = -10;
      xDirection = 0;
    } else if (key === 39 && xDirection === 0) {
      xDirection = 10;
      yDirection = 0;
    } else if (key === 40 && yDirection === 0) {
      yDirection = 10;
      xDirection = 0;
    }
  }
  const playGame = function() {
    if (gameEnded) {
      return
    }
    changedDirection = false;
    drawCanvas()
    drawFood()
    moveSnake()
    drawSnake()

    setTimeout(()=> {
      playGame()
    }, 100)
  }
  makeFood()
  playGame()

  document.addEventListener('keydown', directionChange);

});