//------------GLOBAL VARIABLES------------
var isDropdownNavOpen = false;
var scrollInExecuted = {
    feature1: false,
    feature2: false,
    feature3: false
};



//------------COMMANDS------------
// ADDING EVENTLISTENER TO NAV TOGGLE
document.querySelector("#nav-toggle").addEventListener("click", toggleDropdownNav);

// ADDING EVENTLISTENERS TO BUTTONS
addEventListernersToButtons("#home-btn", "#hero-section", true);
addEventListernersToButtons("#features-btn", "#features-section", true);
addEventListernersToButtons("#pricing-btn", "#pricing-section", true);
addEventListernersToButtons("#signup-btn", "#signup-section", true);
addEventListernersToButtons("#nav-signup-btn", "#signup-section", false);
addEventListernersToButtons("#learnmore-btn", "#features-section", false);



//------------HELPER FUNCTIONS------------
function toggleDropdownNav() {
    if (isDropdownNavOpen) {
        document.querySelector("#nav-dropdown").style.display = "none";
        isDropdownNavOpen = false;
    } else {
        document.querySelector("#nav-dropdown").style.display = "block";
        isDropdownNavOpen = true;
    } 
}

function addEventListernersToButtons(button, target, isNavLink) {
    document.querySelector(button).addEventListener("click", function() {
        scrollTo(target);

        if (isNavLink) {
            toggleDropdownNav();
        }
    });
}

function formalizeElementName(element) {
    var result = element.replace("#", "");
    result = result.replace("-", "");
    
    return result;
}

function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= -100 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 
    );
}

var scroll = function () {
    fadeIn("#feature-1", 200);
    fadeIn("#feature-2", -200);
    fadeIn("#feature-3", 200);
};
var waiting = false;
window.onscroll = function() {
    if (waiting) {
        return;
    }
    waiting = true;

    scroll();

    setTimeout(function () {
        waiting = false;
    }, 100);
};



//------------ANIMATION FUNCTIONS------------
function scrollTo(target) {
    var elementSelector = document.querySelector(target);

    const elementOffset = elementSelector.getBoundingClientRect().top;
    const scrollPosition = window.scrollY;
    const documentTop = document.documentElement.clientTop;
    const scrollOffset = elementOffset + scrollPosition - documentTop;

    anime({
      targets: [document.documentElement, document.body],
      scrollTop: scrollOffset - 45,
      duration: 500,
      easing: 'easeInOutQuad'
    });
}

function fadeIn(element, from) {
    var formalizedElement = formalizeElementName(element);

    if (!scrollInExecuted[formalizedElement]) {
        if (isElementInViewport(document.querySelector(element))) {
            var timeline = anime.timeline({
                duration: 800,
                easing: 'easeInOutQuad'
            });

            timeline.add({
                targets: element,
                translateX: [from, 0],
                opacity: [0, 1],
            })
        
            scrollInExecuted[formalizedElement] = true;
        }
    }
}


