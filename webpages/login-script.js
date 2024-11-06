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
