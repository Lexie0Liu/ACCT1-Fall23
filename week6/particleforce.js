class Particle{
    constructor(_posX=width*0.5,_posY=height*0.5){
        this.position=createVector(_posX,_posY)
        // this.velocity=p5.Vector.random2D()
        // this.velocity.mult(4)
        this.velocity=createVector(0,0)
        this.accel=createVector(0,0)
        
        this.cColor=color(random(TWO_PI),random(0.9,1),random(0.7,1))
        this.cRadius=15
    }

    display(){
        fill(this.cColor)
        noStroke()
        circle(this.position.x,this.position.y,this.cRadius*2)
    }

    addForce(_force){
        this.accel.add(_force)
    }

    attractToMouse(){
        let mousePos=createVector(mouseX,mouseY)
        mousePos.sub(this.position)
        mousePos.setMag(1.5)

        this.accel.add(mousePos)
    }

    move(){
        this.velocity.add(this.accel)
        this.velocity.limit(4)
        this.position.add(this.velocity)

    if(this.position.x-this.cRadius<=0){
        this.position.x=this.cRadius
        this.velocity.x*= -1
    }
    if(this.position.x+this.cRadius>=width){
        this.position.x=width-this.cRadius
        this.velocity.x*= -1
    }
    if(this.position.y-this.cRadius<=0){
        this.position.y=this.cRadius
        this.velocity.y*= -1
    }
    if(this.position.y+this.cRadius>=height){
        this.position.y=height-this.cRadius
        this.velocity.y*= -1
    }
    }

    reachOut(_allParticles=[]){
        _allParticles.forEach((otherP)=>{
            if(otherP!=this){
                if(this.position.dist(otherP.position)<=150){
                    stroke(this.cColor)
                    strokeWeight(2)
                    line(this.position.x,this.position.y,otherP.position.x,otherP.position.y)
                }
            }
        })

    }


}