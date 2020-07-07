var isDropdownNavOpen = false;

document.querySelector("#nav-toggle").addEventListener("click", toggleDropdownNav);

function toggleDropdownNav() {
    if (isDropdownNavOpen) {
        document.querySelector("#nav-dropdown").style.display = "none";
        isDropdownNavOpen = false;
    } else {
        document.querySelector("#nav-dropdown").style.display = "block";
        isDropdownNavOpen = true;
    } 
}