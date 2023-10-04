let firstScetion = document.getElementById("sectionOne" )
let firstImage = document.getElementById("imageOne")
let buttonChangeColor = document.getElementById("colorChangeBTN")
let buttonGenBTN = document.getElementById("colorGenBTN")
let buttonChangeImage= document.getElementById("imageChangeBTN")
let buttonAddtext= document.getElementById("addTextBTN")

console.log(buttonChangeColor)


let changeColor = function(){
    firstScetion.style.backgroundColor = "rgb(170,250,170)"
}

let generateColor = function(){
    let redComp = Math.random() * 255
    let greenComp = Math.random() * 255
    let blueComp = Math.random() * 255
    firstScetion.style.backgroundColor = "rgb("+redComp
    +", "+greenComp+","+blueComp+")"
}

let changeImage = function (){
    firstImage.classList.toggle("image-2")
    console.log(firstImage.classList[0])
    if(firstImage.classList[0] == "image-2"){
        firstImage.src = "taylor1.jpeg"
    }
    else{
        firstImage.src="taylor2.jpeg"
    } 
}

let addText = function(){
    let myParag = document.createElement("p")
    myParag.innerText = "Hello, this is JavaScript"
    myParag.style.fontWeight = "bolder"
    firstScetion.appendChild(myParag)
}


firstScetion.style.backgroundColor = "rgb(250, 170, 170)"

buttonChangeColor.addEventListener("click", changeColor)
buttonGenBTN.addEventListener("click", generateColor)
buttonChangeImage.addEventListener("click", changeImage)
buttonAddtext.addEventListener("click",addText)