const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//getContext() method會回傳一個canvas畫布。
//畫布可以用來在canvas內畫圖。

const unit = 20;    
const row = canvas.height / unit;
const column = canvas.width / unit; //將canvas切成幾等份。 320/20 = 16

let snake = []; //array中的每個元素都是一個物件。

//物件工作是儲存身體的x, y座標。
function creatSnake() {
    snake[0] = {
        x: 80,
        y: 0,
    };
    snake[1] = {
        x: 60,
        y: 0,
    };
    snake[2] = {
        x: 40,
        y: 0,
    };
    snake[3] = {
        x: 20,
        y: 0,
    };    
}


//產生果實
class Fruit {
    constructor() {
        this.x = Math.floor(Math.random() * column) * unit; //Math.random = [0, 1]
        this.y = Math.floor(Math.random() * row) * unit;
    }

    drawFruit() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, unit, unit);
    }

    pickALocation() {
        let overlapping = false;
        let new_x;
        let new_y;
        //判斷產生果實的位置是否與蛇身體重疊
        function checkOverlap(new_x, new_y) {
            for (let i = 0; i < snake.length; i++) {
                if (new_x == snake[i].x && new_y == snake[i].y) {
                    // console.log("overlapping...");
                    overlapping = true;
                    return;
                }else {
                    overlapping = false;
                }
            }
        }
        do {
            new_x = Math.floor(Math.random() * column) * unit;
            new_y = Math.floor(Math.random() * row) * unit;
            // console.log("果實可能的新座標", new_x, new_y);
            checkOverlap(new_x, new_y);
        }while (overlapping);

        this.x = new_x;
        this.y = new_y;
    }
}

//初始設定
creatSnake();
let myFruit = new Fruit();
addEventListener("keydown", changeDirection);
let d = "Right";

//按鍵控制
function changeDirection(e) {
    // console.log(e); //偵測上下左右keycode。
    if (e.key == "ArrowLeft" && d != "Right") {
        d = "Left";
    }else if (e.key == "ArrowUp" && d != "Down") {
        d = "Up";
    }else if (e.key == "ArrowRight" && d != "Left") {
        d = "Right";
    }else if (e.key == "ArrowDown" && d != "Up") {
        d = "Down";
    }

    //每次按下移動按鍵後，在下一幀畫出來之前
    //不接受任何keydown事件
    //這樣可以防止連續按鍵導致蛇在邏輯上自殺
    window.removeEventListener("keydown", changeDirection);
}

//分數計算
let score = 0;
let highestScore;
loadHighestScore();
document.getElementById("myScore").innerHTML = "遊戲分數：" + score;
document.getElementById("myScore2").innerHTML = "最高分數：" + highestScore;

//繪畫
function draw() {
    //每次畫圖之前，確認蛇有沒有咬到自己。
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            clearInterval(myGame);
            alert("GAME OVER");
            return;
        }
    }

    //每次draw背景都先設定黑色。
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //畫出果實。
    myFruit.drawFruit();

    //蛇的顏色。
    for (let i = 0; i < snake.length; i++) {
        if( i == 0) {
            ctx.fillStyle = "lightgreen";
        }else {
            ctx.fillStyle = "lightblue";        
        }
        ctx.strokeStyle = "white";

        //偵測蛇撞牆。
        if (snake[i].x >= canvas.width) {
            snake[i].x = 0;
        }
        if (snake[i].x < 0) {
            snake[i].x = canvas.width - unit;
        }
        if (snake[i].y >= canvas.height) {
            snake[i].y = 0;
        }
        if (snake[i].y < 0) {
            snake[i].y = canvas.height - unit;
        }

        // x, y, width, height，畫出蛇。
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
    };

    //以目前的變數方向(d)來決定蛇的下一幀要放在哪個座標。
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    

    if (d == "Left") {
        snakeX -= unit;
    }else if (d == "Up") {
        snakeY -= unit;
    }else if (d == "Right") {
        snakeX += unit;
    }else if (d == "Down") {
        snakeY += unit;
    };

    //更新snake[,]的數值
    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    //確認蛇是否有吃到果實
    if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {        
        myFruit.pickALocation();
        score++;
        setHighestScore(score);
        document.getElementById("myScore").innerHTML = "遊戲分數：" + score;
        document.getElementById("myScore2").innerHTML = "最高分數：" + highestScore;
        //重新選定一個位置產生果實
        //畫出新果實
        //更新分數
    }else {
        snake.pop();
    }
    snake.unshift(newHead);
    window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);    //每0.1秒執行一次。

//取得最高分分數紀錄
function loadHighestScore() {
    if(localStorage.getItem("highestScore") == null) {
        highestScore = 0;
    }else {
        highestScore = Number(localStorage.getItem("highestScore"));
    }
}

function setHighestScore(score) {
    if(score > highestScore) {
        localStorage.setItem("highestScore", score);
        highestScore = score;
    }
}