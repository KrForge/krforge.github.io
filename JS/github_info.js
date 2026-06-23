
// Get Github data from a given repo
async function loadRepoInfo(repo) {
    let targetRepo = "https://api.github.com/repos/KrForge/";
    targetRepo = targetRepo + repo + "/releases/latest";

    const response = await fetch(
        targetRepo
    );
    console.log(targetRepo);
    const release = await response.json();

    const version = release.name;
    const publishDate = release.published_at;
    
    const time = convertTimeToReadable(publishDate);

    document.getElementById("DownloadVersion").textContent = version;
    document.getElementById("ReleaseDate").textContent = time;
}

function convertTimeToReadable(dateString) {
    const now = new Date();
    const published = new Date(dateString);

    const seconds = Math.floor((now - published) / 1000);
    
    const units = [
        { name: "year",   seconds: 31536000 },
        { name: "month",  seconds: 2592000 },
        { name: "week",   seconds: 604800 },
        { name: "day",    seconds: 86400 },
        { name: "hour",   seconds: 3600 },
        { name: "minute", seconds: 60 }
    ];

    for (const unit of units) {
        const count = Math.floor(seconds / unit.seconds);

        if (count >= 1) {
            return `${count} ${unit.name}${count !== 1 ? "s" : ""} ago`;
        }
    }

    return "Just now";
}

function getIsDataRequested() {
    let requester = document.getElementById("info_request");

    let type = requester.getAttribute("data-request-type");

    if (requester !== null) {
        switch (type) {
            case "download":
                let downloadButton = requester.children[0];
                let repo = downloadButton.getAttribute("data-repo");
                loadRepoInfo(repo);
                break;
            default:
                break;
        }
    }
}

getIsDataRequested();
