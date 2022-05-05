window.addEventListener('DOMContentLoaded', (event) => {
  let canvas = document.getElementById('game_canvas');
  let ctx = canvas.getContext('2d');
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;
  let blockSize = 10;
  let canvasBC = 'white';
  let canvasSC = 'black';
  let snakeBC = 'green';
  let snakeSC = 'black';
  let foodBC = 'red';
  let foodSC = 'black';

  //-------------
  //Square Constructor
  //-------------

  class Square {
    constructor(x, y){
      this.x = x;
      this.y = y;
    }

    drawBlock(fill, stroke) {
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.fillRect(this.x, this.y, blockSize, blockSize)
      ctx.strokeRect(this.x, this.y, blockSize, blockSize)
    }
  }

  //--------------
  //Food Constructor
  //--------------

  class Food extends Square {
    constructor() {
      super()
    }

    getFoodPosition(min, max) {
      return Math.floor((Math.random() * (max - min) + min) / 10) * 10
    }

    createFood() {
      this.x = this.getFoodPosition(0, canvas.width - blockSize);
      this.y = this.getFoodPosition(0, canvas.width - blockSize);
    }

    drawFood() {
      this.drawBlock(foodBC, foodSC)
    }
  }

  //---------------
  //Snake Constructor
  //---------------

  class Snake extends Food {
    constructor() {
      super()
      this.segments = [];
      this.xDirection = 10;
      this.yDirection = 0;
      this.gameEnded = false;
    }

    createSnake() {
      let starterSegments = [{x: 80, y: 50}, {x: 70, y: 50}, {x: 60, y: 50}, {x: 50, y: 50}];
      starterSegments.forEach((oneSeg)=> {
        this.segments.push(new Square(oneSeg.x, oneSeg.y))
      })

      this.createFood()
      this.drawFood()
      this.drawSnake()
    }

    moveSnake() {
      let newHead = new Square(this.segments[0].x + this.xDirection, this.segments[0].y + this.yDirection);
      this.segments.unshift(newHead)

      if (newHead.x === this.x && newHead.y === this.y) {
        this.createFood()
      } else {
        this.segments.pop()
      }
      this.didGameEnd()

    }

    drawSnake() {
      this.segments.forEach((oneSeg)=> {
        oneSeg.drawBlock(snakeBC, snakeSC)
      })
    }

    changedDirections(event) {
      let key = event.keyCode;

      if (key === 37 && this.xDirection === 0) {
        this.xDirection = -10;
        this.yDirection = 0;
      }

      if (key === 38 && this.yDirection === 0) {
        this.xDirection = 0;
        this.yDirection = -10;
      }

      if (key === 39 && this.xDirection === 0) {
        this.xDirection = 10;
        this.yDirection = 0;
      }

      if (key === 40 && this.yDirection === 0) {
        this.xDirection = 0;
        this.yDirection = 10;
      }
    }

    didGameEnd() {
      let head = this.segments[0];
      if (head.x < 0 || head.x > canvas.width - 10 || head.y < 0 || head.y > canvas.height - 10) {
        this.gameEnded = true;
        return
      }

      for (var i=3; i < this.segments.length; i++) {
        let current = this.segments[i];
        if (head.x === current.x && head.y === current.y) {
          this.gameEnded = true;
          return
        }
      }
    }
  }

  const drawCanvas = function() {
    ctx.fillStyle = canvasBC;
    ctx.strokeStyle = canvasSC;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
  }

  const playGame = function () {

    if (this.gameEnded) {
      return
    }

    setTimeout(()=> {
      drawCanvas()
      this.moveSnake()
      this.drawFood()
      this.drawSnake()
      playGame.call(startSnake)
    }, 100)
  }

  drawCanvas()
  let startSnake = new Snake();
  startSnake.createSnake()
  playGame.call(startSnake)

  document.addEventListener('keydown', startSnake.changedDirections.bind(startSnake))

});