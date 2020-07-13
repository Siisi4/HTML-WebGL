

//var element = createHtmlElement()

var canvas = document.querySelector("#targetCanvas")
const ctx = canvas.getContext('2d');

var ressources = {
    personnage:undefined,
    enemy:undefined,
    bg:undefined
}

var frame = 0;
var lastFrameWithEnemy;
var randomPosForNextEnemy = 100;
var difficultLevel = 1;

var player = {
    pos:{x:0, y:0},
    v:{x:0, y:0},
    animations:{
        frame:0,
        spacing:15,
        width: 136,
        clips:{
            idle:[0],
            walk:[0,1,2],
            jump:[3,4],
            walkBack:[5,6]
        }
    }
}

var enemies = [
    //{pos:{x:0 ,y:0}}
]

document.addEventListener("keydown", function(e) {
    //console.log(e.key)
    if(e.key == "z") {
        //console.log("press Z -> haut");
        //console.log(element.style.top);
        player.v.y = 4
    }
    if(e.key == "q") {
        //console.log("Press Q -> gauche");
        //console.log(element.style.left);
        player.v.x = -3
    }
    if(e.key == "d") {
        //console.log("Press D -> droite");
        //console.log(element);
        //console.log(element.style.left);
        player.v.x = 3
    }
    //console.log("speed");
    //console.log(player.v);
    //physics()
})

document.addEventListener("keyup", function(e) {
    //console.log(e.key)
    if(e.key == "z") {
        //player.v.y = 0
    }
    if(e.key == "q") {
        player.v.x = 0
    }
    if(e.key == "d") {
        player.v.x = 0
    }
    //console.log("speed");
    //console.log(player.v);
    //physics()
})


function physics() {
    var maxHeight = -250
    var isJumping = (player.pos.y > 0)

    //console.log(player.pos.y)
    //console.log(player.pos.y < maxHeight)

    if (player.pos.y < maxHeight){         //saute jusqu'à 200
        player.v.y = -3
    }

    if(player.pos.y > 0){   // redescend jusqu'à 0 puis s'arrête
        player.v.y = 0
        player.pos.y = 0
    }

    player.pos.x = player.pos.x + player.v.x
    player.pos.y = player.pos.y - player.v.y
    // RENDERING
}

function imageLoader(url, callback) {
    var image = new Image()
    image.onload=function(){
        callback(image)
    }
    image.src = url
}

function preloader() {
    imageLoader("./img/pc.png", function(image){
        ressources.personnage = image
    })
    imageLoader("./img/enemy.png", function(image){
        ressources.enemy = image
    })
    imageLoader("./img/background.png", function(image){
        ressources.bg = image
    })
}

function manageEnemies() {
    if (enemies.length == 0){
        enemies.push({pos:{x:1200, y:0}, v:2+difficultLevel})
    }else{
        var lastEnemyPos = enemies[enemies.length-1].pos.x

        if (lastEnemyPos < (300 + randomPosForNextEnemy) ){
            enemies.push({pos:{x:1200, y:0}, v:2+difficultLevel+Math.random()})
            difficultLevel += 0.1
            if (difficultLevel >= 4){
                difficultLevel = 1
            } 
            randomPosForNextEnemy = Math.random()*1000
        }
    }

    for (var i=0; i< enemies.length;i++){
        enemies[i].pos.x -= enemies[i].v
    }
}

function manageStates(){
    var currentState = "idle"
    if(player.pos.y < 0){
        currentState = "jump"
    }else if (player.v.x == 0){
        currentState = "idle"
    }else if (player.v.x > 0){
        currentState = "walk"
    }else if (player.v.x < 0){
        currentState = "walkBack"
    }
    var clip = player.animations.clips[currentState]
    var effectiveFrame = player.animations.frame += 1 
    return effectiveFrame;
}


function render(){
    if(ressources.personnage && ressources.enemy) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(ressources.bg, 0, 0 );
        manageStates()
        //ctx.fillRect(player.pos.x, player.pos.y+200, 150, 100);
        //ctx.drawImage(ressources.personnage, player.pos.x+10, player.pos.y+370 );
        ctx.drawImage(ressources.personnage, 0, 0, 102, 168, player.pos.x, player.pos.y+370, 102, 168);
        ctx.drawImage(ressources.enemy, enemies[0].pos.x, enemies[0].pos.y+400 );
        for (var i = 0;i< enemies.length; i++){
            ctx.drawImage(ressources.enemy, enemies[i].pos.x, enemies[i].pos.y+400 );
        }
    }else{
        preloader()
    }
}

function createBoundingBox(pos){
    return {
        left:pos.x,
        right:pos.x + 150,
        top:pos.y,
        bottom:pos.y + 120 
    }
}

function manageCollisions(){
    var playerBox = createBoundingBox(player.pos)
    //ctx.fillRect(playerBox.left, playerBox.top+400, playerBox.right-playerBox.left, playerBox.bottom )
    for (var i=0; i< enemies.length;i++){
        var enemyBox = createBoundingBox(enemies[i].pos)
        //ctx.fillRect(enemyBox.left, enemyBox.top+400, enemyBox.right-enemyBox.left, enemyBox.bottom )
    if(playerBox.right > enemyBox.left && enemyBox.right > playerBox.left){
        if (playerBox.bottom > enemyBox.top){
            alert("boum !")
        }
    }
    }
}

function play() {
    manageEnemies();
    physics();
    render();
    manageCollisions();
    //console.log("play");
    requestAnimationFrame(play);
}

play();