Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
prediction_1 = "";
prediction_2 = "";

camera = document.getElementById("camera");
Webcam.attach('camera');

function take_snapshot(){
Webcam.snap(function (data_uri){
    document.getElementById("result").innerHTML = '<img src = "' + data_uri + '" id = "captured_image">';
});
}
console.log("ml5.version : ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/c0GYBvCGp/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
function speak(){
    var synth =  window.speechSynthesis;
    speak_data_1 = "The first predication is" + prediction_1;
speak_data_2 = "The Second prediction is" + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utterThis)
}
function Check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name_1").innerHTML = results[0].label;
            document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
            speak();
        }
     }