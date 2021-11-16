const startingMinutes = 25;
const restMinutes = 5;
let timeWork = startingMinutes * 60;
let timeRest = restMinutes * 60;

let totalTimeWork = 0;
let totalTimeRest = 0;

let isWorking = false;
let isTimeRun = false;

const countDownEl = document.getElementById("countdonw");
const buttonStartCount = document.getElementById("buttonStart");
const buttonStopCount = document.getElementById("buttonStop");

const htmlCounting1 = document.getElementById("counting1");
const htmlCounting2 = document.getElementById("counting2");

const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");

let intervalTimeVar = null;

//main
document.addEventListener("DOMContentLoaded", () => {
    eventListeners();
})

//events
function eventListeners() {
    buttonStartCount.addEventListener("click", () => {
        if(!isTimeRun) {
            intervalTimeVar = setInterval(updateCountdown, 1000);
            isTimeRun = true;
        }
    })

    buttonStopCount.addEventListener("click", () => {
        if(isTimeRun){
            clearInterval(intervalTimeVar);
            isTimeRun = false;
        }
    })
}

//functions
function updateCountdown(){
    if( timeWork > 0){
        if(!isWorking) { 
            changeStateAndPlayAudio(true, audio1);
        }
        totalTimeWork++;
        timeWork--;

        setTimeUICalculate(timeWork, countDownEl);
        setTimeUICalculate(totalTimeWork, htmlCounting1);
        
    }else if(timeRest > 0){
        if(isWorking) { changeStateAndPlayAudio(false, audio2);}
        totalTimeRest++;
        timeRest--;

        setTimeUICalculate(timeRest, countDownEl);
        setTimeUICalculate(totalTimeRest, htmlCounting2);

    }else{
        resetAllCount();
    }
}

function setTimeUICalculate(timeShowUI, htmlComponentToShowTime){
    const minutes = Math.floor(timeShowUI / 60);
    let seconds = timeShowUI % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    htmlComponentToShowTime.innerHTML = `${minutes}: ${seconds}`;
}

function changeStateAndPlayAudio(newValue, audio){
    isWorking = newValue;

    if (audio !== undefined) {
        audio.play();
    }
}

function resetAllCount(){
    timeWork = startingMinutes * 60;
    timeRest = restMinutes * 60;
}