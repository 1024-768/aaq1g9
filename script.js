const audio = new Audio("resources/audio/bgaudio.mp3");
let buttontext=document.getElementById("btntxt");
    const button = document.getElementById("togBgAudio");
    button.addEventListener("click", function(){                
        if (audio.paused) {
            audio.play();
            console.log("Play");
            buttontext.textContent="❚❚";
        } 
        else {
            audio.pause();
            console.log("pause");
            buttontext.textContent="▷";
        }
    });

    