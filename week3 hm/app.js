let buttonOne=document.getElementById("buttonOne")
let firstImage=document.getElementById("imageOne")

let buttonTwo=document.getElementById("buttonT")
let NextImage=document.getElementById("imageT")

let buttonThree=document.getElementById("buttonThree")
let AfterImage=document.getElementById("imageThree")

let buttonFour=document.getElementById("bottonF")
let FinalImage=document.getElementById("imageF")



let changeingOne=function(){
    firstImage.style.display="block";
    NextImage.style.display="none";
    AfterImage.style.display="none";
    FinalImage.style.display="none";

}

let changeingTwo=function(){
    firstImage.style.display="none";
    NextImage.style.display="block";
    AfterImage.style.display="none";
    FinalImage.style.display="none";

}

let changeingThree=function(){
    firstImage.style.display="none";
    NextImage.style.display="none";
    AfterImage.style.display="block";
    FinalImage.style.display="none";

}

let changeingFour=function(){
    firstImage.style.display="none";
    NextImage.style.display="none";
    AfterImage.style.display="none";
    FinalImage.style.display="block";

}



buttonOne.addEventListener("click",changeingOne)
buttonT.addEventListener("click",changeingTwo)
buttonThree.addEventListener("click",changeingThree)
buttonF.addEventListener("click",changeingFour)