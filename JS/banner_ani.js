// Home animation
const HomeAniIcons = [
    "Resources/HighRes/Software/Briefcase.png",
    "Resources/Win7Flag.png",
    "Resources/HighRes/Games.png",
    "Resources/Shoutouts/Godot.png",
    "Resources/HighRes/Store.png"
];

const HomeAniRows = document.querySelectorAll(".AnimationRow");

function getNeededHomeAniData() {
    if (HomeAniRows.length > 0) {
        return [HomeAniRows[0].offsetHeight, HomeAniRows[0].offsetWidth];
    } else {
        return [null, null];
    }
}

let HomeIconWidth = getNeededHomeAniData()[0];
let HomeRowWidth = getNeededHomeAniData()[1];
let ActiveHomeIcons = [];

function calcIconCount() { // gets the best number of icons for the width of the rows
    let count = 0;

    while (count * HomeIconWidth < HomeRowWidth) {
        count += 1
    }
    
    return count - 2; // subtract two to make icons less tightly packed
}

function calcSpacing() { // Calculates the best spacing between icons
    //Subtracting 1 from the icon count here leads to one icon being offscreen, making warping seamless
    return (HomeRowWidth - (HomeIconWidth * (IconsPerRow - 1))) / (IconsPerRow - 1);
}

let IconsPerRow = calcIconCount();
let IconSpacing = calcSpacing();

function initHomeAni() {
    HomeAniRows.forEach((row, index) => {
        let direction = index % 2 == 0 ? "left" : "right";
        for (let i = 0; i < IconsPerRow; i++) {
            spawnIcon(row, direction, (HomeIconWidth + IconSpacing) * i, index, i);
        }
    });
}

function spawnIcon(row, direction, startX, index, arrayPos) {
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("AnimationBox");

    const iconImg = document.createElement("img");
    iconDiv.classList.add("AnimationBoxIcon");

    let imageIndex = getAcceptableImageIndex(getPrevIconInRow(ActiveHomeIcons[index]));

    iconImg.src = HomeAniIcons[imageIndex];
    iconDiv.id = imageIndex;

    iconDiv.appendChild(iconImg);
    row.appendChild(iconDiv);

    let x = startX ?? (direction === "left" ? 0 : HomeRowWidth);

    iconDiv.style.transform = `translateX(${x}px)`;

    ActiveHomeIcons.push({
        el: iconDiv,
        row: row,
        slot: arrayPos,
        dir: direction,
        x: x,
        speedMul: index * 0.3
    })
}

function getAcceptableImageIndex(prevIndex) {
    if (HomeAniIcons.length <= 1) return 0;
    
    let imageIndex = Math.floor(Math.random() * HomeAniIcons.length);
    
    if (ActiveHomeIcons.length === IconsPerRow * HomeAniRows.length) {
        let prevEl = Number(ActiveHomeIcons[prevIndex].el.id);
        
        while (imageIndex === prevEl) { // Should prevent this icon from picking the same icon as the last one
            imageIndex = Math.floor(Math.random() * HomeAniIcons.length);
        }
    }

    return imageIndex;
}

const HomeAniSpeed = 1.0;

function animateHomeIcons() {
    ActiveHomeIcons.forEach(icon => {

        if (icon.dir === "left") {
            icon.x -= HomeAniSpeed + icon.speedMul;
        } else {
            icon.x += HomeAniSpeed + icon.speedMul;
        }

        const totalWidth = IconsPerRow * (HomeIconWidth + IconSpacing);

        let index = ActiveHomeIcons.indexOf(icon);

        if (icon.dir === "left" && icon.x < -HomeIconWidth) {
            icon.x += totalWidth;
            updateIconImg(icon.el, index);
        }

        if (icon.dir === "right" && icon.x > HomeRowWidth) {
            icon.x -= totalWidth;
            updateIconImg(icon.el, index);
        }

        icon.el.style.transform = `translateX(${icon.x}px)`;
    });

    requestAnimationFrame(animateHomeIcons);
}

function getPrevIconInRow(icon) {
    if (ActiveHomeIcons.length <= 0) return 0;

    const targetSlot = (icon.slot - 1 + IconsPerRow) % IconsPerRow;

    for (let i = 0; i < ActiveHomeIcons.length; i++) {
        const other = ActiveHomeIcons[i];

        if (other === icon) {
            continue;
        };

        if (other.row !== icon.row) {
            continue;
        };

        if (other.slot === targetSlot) {
            return other;
            break
        }
    }

    return 0;
}

function updateIconImg(el, index) {

    let prevIndex = getPrevIconInRow(ActiveHomeIcons[index]).slot;

    let curImage = Number(el.id);
    let newImage = getAcceptableImageIndex(prevIndex);

    while (newImage === curImage) { // Don't allow the same image to be chosen
        newImage = getAcceptableImageIndex(prevIndex);
    }

    el.querySelector("img").src = HomeAniIcons[newImage];
    el.id = newImage;
}

function resetHomeAni() {
    ActiveHomeIcons.forEach(icon => {
        icon.row.removeChild(icon.el);
    });

    ActiveHomeIcons = [];

    HomeRowWidth = HomeAniRows[0].offsetWidth;

    const newCount = calcIconCount();
    IconsPerRow = newCount;

    initHomeAni();
    animateHomeIcons();
}

let resizeTimeout;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        resetHomeAni();
    }, 150);
});

initHomeAni();
animateHomeIcons();