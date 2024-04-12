// Reference: https://stackoverflow.com/questions/31109581/javascript-timer-progress-bar
// Using CSS3 animation

// https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event

// https://stackoverflow.com/questions/55618416/how-to-make-animation-duration-dynamic-according-to-a-javascript-value 

function updateTimer(duration, callback) {
    var timer = document.getElementById("timer"); 
    var innermeter = timer.querySelector(".inner-meter")  // get .inner-meter div from HTML

    // sets animation duration dynamically in JS instead of defining 3 separate .progressbar divs in HTML
    innermeter.style.animationDuration = duration;   

    if (typeof(callback) === "function") {
        timer.addEventListener("animationend", callback); // executes a function, i.e. alert, when animation ends 
    }
    
    var progressBar = timer; // get .progressbar div from HTML (same as timer in this case);
    progressBar.appendChild(innermeter); 

    var progressBarPlaceholder = document.getElementById("progressbar-placeholder"); 
    progressBarPlaceholder.appendChild(timer);   // to tag the timer to the "progressbar-placeholder" div in main.js

    innermeter.style.animationPlayState = "running"; // plays on default, will continue to play after unpaused
}


function updateTimerEas(duration, callback) {
    updateTimer(duration, callback); 
}; 


function updateTimerInt(duration, callback) {
    updateTimer(duration, callback); 
}

function updateTimerHar(duration,callback) {
    updateTimer(duration, callback); 
}