function drawCard(parentEl, link, external, name, bannerImgSrc, imgSrc, description) {
    // Card Element
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("Panel");
    cardDiv.id = "Shoutout";

    // Interact Element (a)
    let interactEl = document.createElement("a");
    interactEl.href = link
    if (external) {
        interactEl.target = "_blank";
    }
    interactEl.setAttribute("style", "display: flex; flex-direction: column;");

    //background images
    let glowImg = document.createElement("img");
    glowImg.src = "CSS/Resources/Aero/CornerGlow.png";
    glowImg.classList.add("PanelCornerGlow");
    glowImg.setAttribute("style", "opacity: 75%;");

    let bannerImg = document.createElement("img");
    bannerImg.src = bannerImgSrc;
    bannerImg.classList.add("PanelCornerGlow");
    bannerImg.setAttribute("style", "opacity: 30%;");

    // Header
    let panelHeader = document.createElement("h3");
    panelHeader.classList.add("PanelHeader");
    panelHeader.textContent = name;

    // Content
    let panelContent = document.createElement("div");
    panelContent.classList.add("ShoutoutContent");

    let contentImg = document.createElement("img");
    contentImg.src = imgSrc;
    contentImg.setAttribute("style", "height:100%; filter: drop-shadow(0px 0px 5px white);");
    
    let contentTxt = document.createElement("p");
    contentTxt.textContent = description;
    contentTxt.setAttribute("style", "filter: drop-shadow(0px 0px 3px black);");

    // Combine
    panelContent.appendChild(contentImg);
    panelContent.appendChild(contentTxt);

    interactEl.appendChild(glowImg),
    interactEl.appendChild(bannerImg),
    interactEl.appendChild(panelHeader),
    interactEl.appendChild(panelContent),

    cardDiv.appendChild(interactEl);

    parentEl.appendChild(cardDiv);
}

async function loadCards() {
    const response = await fetch("DATA/Cards.json");
    const cardJson = await response.json();
    
    const containers = document.querySelectorAll("#CardContainer");

    containers.forEach(container => {
        const type = container.dataset.cardType;
        const cardSet = cardJson[type];
        
        if (cardSet) {
            Object.values(cardSet).forEach(card => {

                drawCard(container, card["link"], card["external"], card["name"], card["banner"], card["img"], card["desc"]);
            })
        }
    })
}

loadCards();