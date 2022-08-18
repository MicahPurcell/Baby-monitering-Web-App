song = ""

function setup(){

canvas = createCanvas(380,380)
canvas.center()
video = createCapture(VIDEO)
video.size(380,380)
video.hide()
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
    
}

function modelLoaded(){
    console.log("Model Loaded")
    status = true;
     
}

function gotResult(error, results){
    if (error) {
        console.log(error)
    }
    else{
    console.log(results)
    objects = results
}
}

img = "";
status = "";
objects = [];

function preload(){
    sound = loadSound('MV27TES-alarm.mp3')
}

function draw(){
    image(video, 0, 0, 380, 380)
     
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (let i = 0; i < objects.length; i++) {
            r=random(255) 
            g=random(255)
            b=random(255)
       
document.getElementById("status").innerHTML = "Status : Object Detected";

fill(r,g,b)
percent = floor(objects[i].confidence * 100)
    text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
    noFill()
    stroke(r,g,b)
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

    if (objects[i].label != "person") {
        sound.play()
    } else {
        sound.stop()
        
    }
        }
    }

}