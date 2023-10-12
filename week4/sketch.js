function setup(){
    let myCanvas = createCanvas(600,600)
    myCanvas.parent("sketchHolder")
    background(200,230,160)

    rotate(QUARTER_PI)
    let interval=width/10
    for(let x=0;x<10;x++){
        line(x*interval,0,x*interval,height)
    }
    for(let y=0;y<10;y++){
        line(0,y*interval,width,y*interval)

    }

    fill(0,0,0)
    rect(100,100,150)
}