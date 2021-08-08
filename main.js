let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32
let snake = []

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right"
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG(){
    context.fillStyle = "lightgray"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake(){
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "gray"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}
function drawFood(){
    context.fillStyle = "black"
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update) //Captando teclas precionadas

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left" //Pegando código da tecla e verificando se a direção não é a contraria para não chocar a snake
    if(event.keyCode == 38 && direction != "up") direction = "down"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "down") direction = "up"
}

function startGame(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0 //Se a snake chegar ao final da tela ela volta pelo outro lado
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box
    if(snake[0].y < 0 && direction == "down") snake[0].y = 16 * box
    if(snake[0].y > 15 * box && direction == "up") snake[0].y = 0

    //Verifica se há colisão entre o corpo da Snake

    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game)
            alert('Game Over')
        }        
    }
    
    createBG()
    createSnake()
    drawFood()
    

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY += box
    if(direction == "down") snakeY -= box

    if(snakeX != food.x || snakeY != food.y){
        snake.pop() //Remove o ultimo espaço da cobra
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}

let game = setInterval(startGame, 100)  // 100 milisegundos para atualizar o jogo