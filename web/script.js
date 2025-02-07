document.getElementById("start-button").addEventListener("click", () => {
    goFullscreen();
    startFucking();
});

function goFullscreen() {
    let element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function startFucking() {

    document.getElementById("start-screen").remove();

    function playSound() {
        let audio = new Audio("https://www.myinstants.com/media/sounds/rick-roll-bass-boosted_ZPqkNIT.mp3");
        audio.loop = true;
        audio.play();
    }

    playSound();

    function createText() {
        let text = document.createElement("div");
        text.className = "text";
        text.innerHTML = "I SLEPT WITH YOUR MOM";
        document.body.appendChild(text);

        function moveText() {
            text.style.left = Math.random() * window.innerWidth + "px";
            text.style.top = Math.random() * window.innerHeight + "px";
        }

        moveText();
        setInterval(moveText, 100);
    }
    
    createText();

    setInterval(() => {
        document.body.style.background = getBrightColor();
    }, 100);

    setInterval(() => {
        createText();
    }, 1000);
}

function getBrightColor() {
    const brightColors = [
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(255, 255, 255)"
    ];

    return brightColors[Math.floor(Math.random() * brightColors.length)];
}
