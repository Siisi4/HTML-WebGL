

//var element = createHtmlElement()

var canvas = document.querySelector("#targetCanvas")
const ctx = canvas.getContext('2d');

var ressources = {
    personnage:undefined,
    enemy:undefined,
    bg:undefined
}

var player = {
    pos:{x:50, y:0},
    v:{x:0, y:0}
}

var enemies = [
    
    {pos:{x:0 ,y:0}}
]

document.addEventListener("keydown", function(e) {
    //console.log(e.key)
    if(e.key == "z") {
        //console.log("press Z -> haut");
        //console.log(element.style.top);
        player.v.y = 3
    }
    if(e.key == "q") {
        //console.log("Press Q -> gauche");
        //console.log(element.style.left);
        player.v.x = -1
    }
    if(e.key == "d") {
        //console.log("Press D -> droite");
        //console.log(element);
        //console.log(element.style.left);
        player.v.x = 1
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
    var maxHeight = -150
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
    imageLoader("./img/personnage.png", function(image){
        ressources.personnage = image
    })
    imageLoader("./img/enemy.png", function(image){
        ressources.enemy = image
    })
}

function manageEnemies() {
    if (ressources.enemy){
        
    }
    else{
        
    }
}

function render(){
    if(ressources.personnage && ressources.enemy) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(player.pos.x, player.pos.y+200, 150, 100);
        ctx.drawImage(ressources.personnage, player.pos.x+10, player.pos.y+200 );

        ctx.drawImage(ressources.enemy, enemies[0].pos.x, enemies[0].pos.y+200 );
    }else{
        preloader()
    }
}


function play() {
    manageEnemies();
    physics();
    render();
    //console.log("play");
    requestAnimationFrame(play);
}

play();