function createHtmlElement(){
    var element = document.createElement("div")
    console.log(element);
    element.style.height = "15px";
    element.style.width = "15px";
    //element.style.backgroundColor = "pink";
    element.style.backgroundImage = "url('./img/personnage.png')";
    element.style.webkitBackgroundSize = "16px 16px"
    element.style.position = "absolute";
    element.style.top = "200px";
    element.style.left = "50px";

    document.body.appendChild(element)
    return element;
}

var element = createHtmlElement()
var player = {
    pos:{x:50, y:0},
    v:{x:0, y:0}
}

document.addEventListener("keydown", function(e) {
    console.log(e.key)
    if(e.key == "z") {
        console.log("press Z -> haut");
        console.log(element.style.top);
        player.v.y = 3
    }
    if(e.key == "q") {
        console.log("Press Q -> gauche");
        console.log(element.style.left);
        player.v.x = -1
    }
    if(e.key == "d") {
        console.log("Press D -> droite");
        console.log(element);
        console.log(element.style.left);
        player.v.x = 1
    }
    console.log("speed");
    console.log(player.v);
    //physics()
})

document.addEventListener("keyup", function(e) {
    console.log(e.key)
    if(e.key == "z") {
        //player.v.y = 0
    }
    if(e.key == "q") {
        player.v.x = 0
    }
    if(e.key == "d") {
        player.v.x = 0
    }
    console.log("speed");
    console.log(player.v);
    //physics()
})


function physics() {
    var maxHeight = -150
    var isJumping = (player.pos.y > 0)

    console.log(player.pos.y)
    console.log(player.pos.y < maxHeight)

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
    element.style.left = player.pos.x + "px"
    element.style.top = player.pos.y +200 + "px"
}

function play() {
    physics();
    console.log("play");
    requestAnimationFrame(play);
}

play();