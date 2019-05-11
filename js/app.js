import "./style.css";

$(() => {
  console.log("dom");

  class Furry {
    constructor() {
      (this.x = 0),
      (this.y = 0),
      (this.direction = "right");
    }
  }

  class Coin {
    constructor() {
      (this.x = Math.floor(Math.random() * 10)),
      (this.y = Math.floor(Math.random() * 10));
    }
  }

  class Game {
    constructor(e) {
      (this.board = $("#board").children()),
      (this.furry = new Furry()),
      (this.coin = new Coin()),
      (this.score = 0);
      (this.idInterval)
    }
    calculatePosition(x, y) {
      return x + y * 10;
    }
    showFurry() {
      this.hideFurry();
      this.board
        .eq(this.calculatePosition(this.furry.x, this.furry.y))
        .addClass("furry");
    }
    hideFurry() {
      this.board
        .parent()
        .find(".furry")
        .removeClass("furry");
    }
    showCoin() {
      this.board
        .eq(this.calculatePosition(this.coin.x, this.coin.y))
        .addClass("coin");
    }
    startGame() {
      this.idInterval = setInterval(() => this.moveFurry(), 250);
    }
    moveFurry() {
      switch (this.furry.direction) {
        case "right":
          this.furry.x += 1;
          break;
        case "left":
          this.furry.x -= 1;
          break;
        case "up":
          this.furry.y -= 1;
          break;
        case "down":
          this.furry.y += 1;
          break;
      }
      this.checkCoinCollision();
      this.showFurry();
      this.gameOver();
    }
    directionFurry(key) {
      console.log(key.which)
      switch (key.which) {
        case 37:
          this.furry.direction = 'left';
          break;
        case 39:
          this.furry.direction = 'right';
          break;
        case 38:
          this.furry.direction = 'up';
          break;
        case 40:
          this.furry.direction = 'down';
          break;
      }
    }
    checkCoinCollision() {
      if (
        this.coin.x === this.furry.x &&
        this.coin.y === this.furry.y
      ) {
        this.board
          .eq(this.calculatePosition(this.coin.x, this.coin.y))
          .removeClass("coin");
          this.score ++;
          $('#score strong').text(this.score);
          this.coin = new Coin;
          this.showCoin();
      }
    }
    gameOver(){
      if(
        this.furry.x < 0 ||
        this.furry.x > 9 ||
        this.furry.y < 0 ||
        this.furry.y > 9
        ){
          const over = $('#over');
          this.hideFurry();
          clearInterval(this.idInterval);
          over.removeClass('invisible');
          over.append('<pre class="pre">GAME OVER</pre>');
        }
    }
  }

  const newGame = new Game();
  newGame.showCoin();
  newGame.showFurry();
  newGame.startGame();

  $(document).on("keydown", e => newGame.directionFurry(e));
});