function Topbar() {
    fetch("Resources/GlobalContent/topbar.html").then(res => res.text()).then(data => {
        document.getElementById("Topbar").innerHTML = data;
    });

    document.dispatchEvent(new Event("SiteLoaded"));
}

Topbar();

alert("My site is currently undergoing a rework to be easier to modify in the future. If you encounter any bugs while on this site, the upcoming, new site will most likely address them.\n\n- KrForge");
