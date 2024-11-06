const audioBtn = document.getElementById('bgaudioBtn');
const bgaudio = document.getElementById('bgaudio');

audioBtn.addEventListener('click', function(){
    if (bgaudio.paused){
        bgaudio.play();
        audioBtn.style.backgroundColor = "white";
    } else{
        bgaudio.pause();
        audioBtn.style.backgroundColor = "gray";
    }
});

document.addEventListener('DOMContentLoaded', function(){
    const username = document.getElementById("usernameinput");
    const password = document.getElementById("password");
    const button = document.getElementById("userSubmit");
    const userWarn = document.getElementById("namewarn"); 
    const passWarn = document.getElementById("warn"); 

    function checkLength() {
        let u =false, p=false;
        const userWord =username.value;
        const passWord =password.value;

        // Check username length
        if (userWord.length<6 && userWord.length>0) {
            userWarn.textContent = "Username must have at least six (6) characters.";
            u = false;
        } 
        else{
            userWarn.textContent = "";
            if (userWord.length>5) u=true; 
        }

        // Check password length
        if (passWord.length<8 && passWord.length>0) {
            passWarn.textContent = "Password must have at least eight (8) characters.";
            p=false;
        } 
        else{
            passWarn.textContent = "";
            if (passWord.length>7) p=true; 
        }
        //if u(username) and p(password) inputted are not valid, disable button
        if (u&&p) {
            button.disabled =false;
        } else {
            button.disabled =true;
        }
    }

    username.addEventListener('input', checkLength);
    password.addEventListener('input', checkLength);
    checkLength();
});
//IMG SLIDER RXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

const track=document.getElementById("clothing-track");


track.dataset.percentage="0";
track.dataset.prevPercentage="0";

window.onmousedown =e=>{
    track.dataset.mouseDownAt=e.clientX; 
};

window.onmouseup=()=>{
    track.dataset.mouseDownAt="0"; 
    track.dataset.prevPercentage=track.dataset.percentage; 
};

window.onmousemove=e=>{
    if (track.dataset.mouseDownAt==="0") return; 


    const mouseDelta=parseFloat(track.dataset.mouseDownAt)-e.clientX;
    const maxDelta=window.innerWidth/2;


    let percentage=(mouseDelta/maxDelta)*-100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage)+percentage;

   
    nextPercentage=Math.max(Math.min(nextPercentage,0),-100);
    track.dataset.percentage=nextPercentage;

    track.animate({
        transform:`translate(${nextPercentage}%,-50%)`},
        {duration:1200,fill:"forwards"});
      
    for(const image of track.getElementsByClassName("image")){
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`}, 
            {duration:1200,fill:"forwards" });
    }
};

//TYPEWRITER RANDOM HOVER ANIM
function randomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars[Math.floor(Math.random() * chars.length)];
}

// Main hover animation function
function typewriterHoverEffect(element) {
    const originalText = element.getAttribute("data-original");
    const textLength = originalText.length;
    element.innerHTML = ''; // Clear current text
    
    // Create spans for each character with staggered animation timing
    originalText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
        element.appendChild(span);

        const maxDuration = 1000; // Total animation time in ms
        const charDuration = (index + 1) * (maxDuration / textLength); // Duration per character
        const interval = 50; // Interval for random changes
        let elapsedTime = 0;

        const animateCharacter = setInterval(() => {
            // Randomize characters up until the designated end time for each character
            if (elapsedTime < charDuration) {
                span.textContent = char === ' ' ? '\u00A0' : randomChar();
            } else {
                span.textContent = char; // Set original character at end
                clearInterval(animateCharacter);
            }
            elapsedTime += interval;
        }, interval);

        // Store interval ID to clear it later if the mouse leaves
        span.dataset.intervalId = animateCharacter;
    });
}

// Apply the hover effect to each animated text element
document.addEventListener('DOMContentLoaded', function() {
    const animatedTexts = document.querySelectorAll('.animatedText');

    animatedTexts.forEach((animatedText) => {
        // Set up the original text for reset after each hover
        animatedText.setAttribute("data-original", animatedText.textContent);

        // Start animation on mouse enter
        animatedText.addEventListener('mouseenter', function() {
            typewriterHoverEffect(this);
        });

        // Reset text and clear intervals on mouse leave
        animatedText.addEventListener('mouseleave', function() {
            const originalText = this.getAttribute("data-original");
            this.innerHTML = originalText; // Reset to original text
            
            // Clear all intervals to stop the animation immediately
            Array.from(this.children).forEach((span) => {
                clearInterval(span.dataset.intervalId);
            });
        });
    });
});