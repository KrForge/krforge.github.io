function Topbar() {
    fetch("Resources/GlobalContent/topbar.html").then(res => res.text()).then(data => {
        document.getElementById("Topbar").innerHTML = data;
    });

    document.dispatchEvent(new Event("SiteLoaded"));
}

Topbar();