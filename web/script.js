document.getElementById("start-button").addEventListener("click", async () => {
    await goFullscreen();
    await startFucking();
});

function goFullscreen() {
    let element = document.documentElement;

    if (element.requestFullscreen) {
        return element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        return element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        return element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        return element.msRequestFullscreen();
    }
}

async function startFucking() {
    document.getElementById("start-screen").remove();

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

    async function playSound() {
        return new Promise((resolve) => {
            let audio = new Audio("https://www.myinstants.com/media/sounds/rick-roll-bass-boosted_ZPqkNIT.mp3");
            audio.loop = true;

            audio.oncanplaythrough = () => {
                audio.play();
                resolve();
            };

            audio.load();
        });
    }

    await playSound();

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
