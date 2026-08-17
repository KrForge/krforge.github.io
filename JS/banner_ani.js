// animation
const IconSets = {
    software : [
        "CSS/Resources/Icons/Software/ReBriefcase.png",
        "CSS/Resources/Icons/Projects.png",
    ],
    games : [
        "CSS/Resources/Icons/Games.png",
        "CSS/Resources/Logos/Godot.png",
    ],
    misc : [
        "CSS/Resources/Icons/Software/Hero7.png",
        "CSS/Resources/Icons/Store.png",
    ],
    contact : [
        "CSS/Resources/Icons/Contact.png",
        "CSS/Resources/Logos/GitHub.png",
    ],
    home : [
        "CSS/Resources/Logos/Win7.png",
        "CSS/Resources/Icons/Games.png",
        "CSS/Resources/Logos/Godot.png",
        "CSS/Resources/Icons/Store.png",
        "CSS/Resources/Icons/Software/Hero7.png",
        "CSS/Resources/Icons/Software/ReBriefcase.png",
    ],
}

const AnimationBanner = document.querySelector(".BannerAnimation");
let AnimationIcons = IconSets[AnimationBanner.dataset.icons];

const AnimationRows = document.querySelectorAll(".AnimationRow");

let IconWidth = AnimationRows[0]?.offsetHeight;
let RowWidth = AnimationRows[0]?.offsetWidth;
let ActiveIcons = [];

function calculateItemsPerRow() { // gets the best number of icons for the width of the rows
    return Math.floor(RowWidth / IconWidth) - 1;
}

function calculateIconSpacing() { // Calculates the best spacing between icons
    //Subtracting 1 from the icon count here leads to one icon being offscreen, making warping seamless
    return (RowWidth - (IconWidth * (IconsPerRow - 1))) / (IconsPerRow - 1);
}
let IconsPerRow = calculateItemsPerRow();
let IconSpacing = calculateIconSpacing();

function initAnimation() {
    AnimationRows.forEach((row, index) => {
        const speed =  0.75 + Math.random() * 2.0;
        for (let i = 0; i < IconsPerRow; i++) {
            spawnIcon(row, (IconWidth + IconSpacing) * i, speed);
        }
    });
}

function spawnIcon(row, startX, scrollSpeed) {
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("AnimationBox");

    const iconImg = document.createElement("img");
    iconDiv.classList.add("AnimationBoxIcon");

    let imageIndex = Math.floor(Math.random() * AnimationIcons.length);    

    iconImg.src = AnimationIcons[imageIndex];
    iconDiv.id = imageIndex;

    iconDiv.appendChild(iconImg);
    row.appendChild(iconDiv);

    iconDiv.style.transform = `translateX(${startX}px)`;

    ActiveIcons.push({
        el: iconDiv,
        row: row,
        x: startX,
        speed: scrollSpeed
    })
}

function animateIcons() {
    ActiveIcons.forEach(icon => {
        icon.x += icon.speed;

        const totalWidth = IconsPerRow * (IconWidth + IconSpacing);

        if (icon.x > RowWidth) {
            icon.x -= totalWidth;

            icon.el.querySelector("img").src = AnimationIcons[Math.floor(Math.random() * AnimationIcons.length)];
        }

        icon.el.style.transform = `translateX(${icon.x}px)`;
    });

    requestAnimationFrame(animateIcons);
}

function resetAnimation() {

    ActiveIcons.forEach(icon => {
        icon.row.removeChild(icon.el);
    });

    ActiveIcons = [];

    RowWidth = AnimationRows[0].offsetWidth;

    const newCount = calculateItemsPerRow();
    IconsPerRow = newCount;

    initAnimation();
}

let resizeTimeout;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        resetAnimation();
    }, 150);
});

initAnimation();
animateIcons();