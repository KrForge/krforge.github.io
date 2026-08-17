async function loadRepoVersion(requestingEl, repo) {
    let targetRepo = "https://api.github.com/repos/KrForge/";
    targetRepo = targetRepo + repo + "/releases/latest";

    const response = await fetch(targetRepo);
    const release = await response.json();

    const version = release.name;

    requestingEl.textContent = version;
}

function getIsDataRequested() {
    let requester = document.querySelector(".GitHubData");

    let type = requester.id;

    if (requester !== null) {
        switch (type) {
            case "GHVersionNumber":;
                let repo = requester.dataset.repo;
                loadRepoVersion(requester, repo);
                break;
            default:
                break;
        }
    }
}

getIsDataRequested();