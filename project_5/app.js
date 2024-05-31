const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//getContext() method會回傳一個canvas畫布。
//畫布可以用來在canvas內畫圖。

const unit = 20;    
const row = canvas.height / unit;
const column = canvas.width / unit; //將canvas切成幾等份。 320/20 = 16


// 製作蛇的身體 Start
let snake = []; //array中的每個元素都是一個物件。
//物件工作是儲存身體的x, y座標。

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

addEventListener("keydown", changeDirection);
let d = "Right";

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
}

function draw() {
    //每次draw背景都先設定黑色。
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    snake.pop();
    snake.unshift(newHead);
}
// 製作蛇的身體 END

let myGame = setInterval(draw, 100);    //每0.1秒執行一次。