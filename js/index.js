//------------GLOBAL VARIABLES------------
var isDropdownNavOpen = false;
var scrollInExecuted = {
    feature1: false,
    feature2: false,
    feature3: false,
    pricingCardsContainer: false,
    signupSection: false
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

document.querySelector("#dot-wrapper-1").addEventListener("click", function() {
    scrollPricingContainerToCard(1, true);
});
document.querySelector("#dot-wrapper-2").addEventListener("click", function() {
    scrollPricingContainerToCard(2, true);
});
document.querySelector("#dot-wrapper-3").addEventListener("click", function() {
    scrollPricingContainerToCard(3, true);
});

window.onload = function() {
    animateHeroSection();
    scrollPricingContainerToCard(2, false);    
};

document.querySelector(".pricing-cards-container").onscroll = function() {
    checkForPricingContainerScrollPosition();
}

//------------HELPER FUNCTIONS------------
function toggleDropdownNav() {
    if (isDropdownNavOpen) {
        animateCloseNavToggle();
        isDropdownNavOpen = false;
    } else {
        document.querySelector("#nav-dropdown").style.display = "block";
        animateOpenNavToggle();
        isDropdownNavOpen = true;
    } 
}

function closeDropdownNav() {
    if (isDropdownNavOpen) {
        animateCloseNavToggle();
        isDropdownNavOpen = false;
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
    result = result.replace(".", "");
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
    animatePricingSection();
    animateSignupSection();
    closeDropdownNav()
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

function scrollPricingContainerToCard(number, animate) {
    var pricingCard = document.querySelector("#pricing-card-" + number);

    var pricingContainer = document.querySelector(".pricing-cards-container");

    var leftBorderPricingCard = pricingCard.getBoundingClientRect().left;

    var rightBorderPricingCard = pricingCard.getBoundingClientRect().right;

    var widthPricingCard = rightBorderPricingCard - leftBorderPricingCard;

    var gapCardViewport = (window.innerWidth - widthPricingCard) / 2;

    var cardScrollPos = leftBorderPricingCard - gapCardViewport;

    if (!animate) {
        pricingContainer.scrollTo(cardScrollPos, 0);
    } else {
        scrollToCardAnimation("+=" + cardScrollPos);
    }
}

function checkForPricingContainerScrollPosition() {
    var pricingCard1 = document.querySelector("#pricing-card-1").getBoundingClientRect();

    var pricingCard2 = document.querySelector("#pricing-card-2").getBoundingClientRect();

    var pricingCard3 = document.querySelector("#pricing-card-3").getBoundingClientRect();

    if (pricingCard1.left >= 0 && pricingCard1.right <= window.innerWidth) {
        styleActiveDot(1);
    }
    else if (pricingCard2.left >= 0 && pricingCard2.right <= window.innerWidth) {
        styleActiveDot(2);
    }
    else if (pricingCard3.left >= 0 && pricingCard3.right <= window.innerWidth) {
        styleActiveDot(3);
    }
}

function styleActiveDot(number) {
    var element = document.querySelector("#dot-" + number);
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
}



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

function scrollToCardAnimation(scrollPosition) {
    anime({
        targets: ".pricing-cards-container",
        scrollLeft: scrollPosition,
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

function animateOpenNavToggle() {
    var timeline = anime.timeline({
        duration: 300,
        easing: 'easeInOutQuad'
    });

    timeline.add({
        targets: "#nav-dropdown",
        translateY: [-20, 0],
        opacity: [0, 1],
    })
    .add({
        targets: "#nav-dropdown li",
        translateX: [20, 0],
        opacity: [0, 1],
    }, "-=200");
}

function animateCloseNavToggle() {
    var timeline = anime.timeline({
        duration: 300,
        easing: 'easeInOutQuad'
    });

    timeline.add({
        targets: "#nav-dropdown li",
        translateX: [0, 20],
        opacity: [1, 0],
    })
    .add({
        targets: "#nav-dropdown",
        translateY: [0, -20],
        opacity: [1, 0],
        complete: function(anim) {
            document.querySelector("#nav-dropdown").style.display = "none";
        }
    }, "-=200");
}

function animateHeroSection() {
    var timeline = anime.timeline({
        duration: 600,
        easing: 'easeInOutQuad'
    });

    timeline.add({
        targets: "#hero-left-column h1",
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800
    })
    .add({
        targets: "#hero-left-column p",
        translateY: [10, 0],
        opacity: [0, 1],
    }, "-=300")
    .add({
        targets: ["#hero-left-column img", "#hero-left-column a"],
        translateY: [10, 0],
        opacity: [0, 1],
    }, "-=200")
}

function animatePricingSection() {
    var element = document.querySelector(".pricing-cards-container");

    if (!scrollInExecuted["pricingCardsContainer"]) {
        if (isElementInViewport(element)) {
            var timeline = anime.timeline({
                duration: 800,
                easing: 'easeInOutQuad'
            });
        
            timeline.add({
                targets: ".pricing-cards-container",
                translateY: [20, 0],
                opacity: [0, 1],
            })
            .add({
                targets: ".dot-con-wrapper",
                translateY: [10, 0],
                opacity: [0, 1],
            }, "-=300")

            scrollInExecuted["pricingCardsContainer"] = true;
        }
    }
}

function animateSignupSection() {
    var element = document.querySelector(".signup-section-content");

    if (!scrollInExecuted["signupSection"]) {
        if (isElementInViewport(element)) {
            var timeline = anime.timeline({
                duration: 800,
                easing: 'easeInOutQuad'
            });
        
            timeline.add({
                targets: ".signup-section-content p",
                scale: [0.95, 1],
                opacity: [0, 1],
            })
            .add({
                targets: ".signup-form",
                opacity: [0, 1],
            }, "-=300")

            scrollInExecuted["signupSection"] = true;
        }
    }
}
