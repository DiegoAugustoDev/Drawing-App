document.addEventListener("DOMContentLoaded", function(){


    let brush = {
        active: false,
        moving:false,
        pos:{x:0,y:0},
        posPrevious: null
    }

    let screen = document.querySelector("#screen");
    let context = screen.getContext("2d")
    let foot = document.getElementById("foot")

    

    screen.width = 1860;
    screen.height = 800;

    let lineWidth = context.lineWidth = 2


    let drawingLine = function(line){
        context.beginPath();
        context.moveTo(line.posPrevious.x, line.posPrevious.y)
        context.lineTo(line.pos.x, line.pos.y)
        context.stroke()
    }

    screen.onmousedown = function(evt){brush.active = true}
    screen.onmouseup = function(evt){brush.active = false}

    screen.onmousemove = function(evt){
        brush.pos.x = evt.clientX
        brush.pos.y = evt.clientY
        brush.moving = true;
    }

    let cycle = function(){
        if(brush.active && brush.moving && brush.posPrevious){
            drawingLine({pos:brush.pos, posPrevious: brush.posPrevious})
            brush.moving = false;
        }
        brush.posPrevious = {x:brush.pos.x, y: brush.pos.y}
        setTimeout(cycle, 10)
    }


    cycle()

    foot.addEventListener("click", function(evt){
        if(evt.target.id ==="reset"){
            location.reload()
        }
    })

    foot.addEventListener("change", function(evt){
        if(evt.target.id === "color"){
            context.strokeStyle = evt.target.value
        }

        if(evt.target.id === "lineWidth"){
            context.lineWidth = evt.target.value
        }
    })
})