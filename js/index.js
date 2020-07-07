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

// ADDING EVENTLISTENERS TO BUTTONS
addEventListernersToButtons("#home-btn", "#hero-section", true);
addEventListernersToButtons("#features-btn", "#features-section", true);
addEventListernersToButtons("#pricing-btn", "#pricing-section", true);
addEventListernersToButtons("#signup-btn", "#signup-section", true);
addEventListernersToButtons("#nav-signup-btn", "#signup-section", false);
addEventListernersToButtons("#learnmore-btn", "#features-section", false);

function addEventListernersToButtons(button, target, isNavLink) {
    document.querySelector(button).addEventListener("click", function() {
        scrollTo(target);

        if (isNavLink) {
            toggleDropdownNav();
        }
    });
}

function scrollTo(target) {
    var elementSelector = document.querySelector(target);

    const elementOffset = elementSelector.getBoundingClientRect().top;
    const scrollPosition = window.scrollY;
    const documentTop = document.documentElement.clientTop;
    const scrollOffset = elementOffset + scrollPosition - documentTop;

    anime({
      targets: [document.documentElement, document.body],
      scrollTop: scrollOffset - 45,
      duration: 800,
      easing: 'easeInOutQuad'
    });
}