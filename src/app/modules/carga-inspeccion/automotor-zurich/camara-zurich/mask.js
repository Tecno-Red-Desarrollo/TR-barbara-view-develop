function addMask() {
    const videoCanvas = document.querySelector('#videoCanvas');
    var video = document.querySelector("#cameraVideo");
    video.onplay = function() {
        setTimeout(drawImge , 300);
    };

}


function drawImge(){
    var video = document.querySelector("#cameraVideo");
    var canvas = document.querySelector("#videoCanvas");w
    var ctx = canvas.getContext('2d');

    canvas.width = 320;
    canvas.height = 240;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    var faceArea = canvas.width /3;
    var pX=canvas.width/2 - faceArea/2;
    var pY=canvas.height/2 - faceArea/2;

    ctx.rect(pX,pY,faceArea,faceArea);
    ctx.lineWidth = "10";
    ctx.strokeStyle = "rgba(252, 175, 23, 0.5)";    
    ctx.stroke();

    var ctx2 = canvas.getContext('2d');
    ctx2.drawImage(video, 0, 0, canvas.width, canvas.height);

    //var maskPic = document.getElementById("#car-front-image");
    var image2 = new Image();
    image2.src = "car-front2.png";
    ctx2.drawImage(image2, 0, 0, 320, 240);

    setTimeout(drawImge , 100);
}
