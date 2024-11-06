//AUDIO NAVBAR

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
//AUDIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO



document.addEventListener('DOMContentLoaded', function(){
    const username = document.getElementById("usernameinput");
    const password = document.getElementById("password");
    const button = document.getElementById("userSubmit");
    const notifWarn = document.getElementById("warn"); 

    function checkLength(){
        let uC=true, 
            pC=true;

      
        if(username.value.length > 0 && username.value.length < 6){
            notifWarn.innerHTML = "Username must have at least six characters.";
            uC=false;
        } 

      
        if(password.value.length > 0 && password.value.length < 8){
            notifWarn.innerHTML = "Password must have at least eight characters.";
            pC=false;
        } 

        
        if(uC && pC && username.value.length >= 6 && password.value.length >= 8) {
            notifWarn.innerHTML = "CONFIRMED BOTH";
            button.disabled=false;
        }
        else{
            button.disabled=true;

            if(uC && pC){
                notifWarn.innerHTML="...";
            }
        }
    } 
        
    

    username.addEventListener('input', checkLength);
    password.addEventListener('input', checkLength);
    checkLength();
});

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
