$(document).ready(function () {
    $("#header").load("header.html");
    $("#footer").load("footer.html");

    console.log('DOM fully loaded and parsed');

    /* Mobile Menu */

    // this function is required in order to make sure the header and footer have finished loading in so the mobile-menu-btn exists before trying to add its click event
    var checkExist = setInterval(function () {
        if ($('#mobile-menu-btn').length) {
            console.log("Exists!");
            
            document.getElementById('mobile-menu-btn').addEventListener('click', event => {

                let currentClass = event.target.getAttribute('class');
                let mobileMenu = document.getElementById('mobile-menu');
        
                let menuIcon = document.getElementById('menu-icon');
                let crossIcon = document.getElementById('cross-icon');
        
                if (currentClass == 'nav-btn menu-up') {
                    event.target.setAttribute('class', 'nav-btn menu-down');
        
                    mobileMenu.classList.remove('inactive');
                    menuIcon.classList.add('inactive');
                    crossIcon.classList.remove('inactive');
        
                } else if (currentClass == 'nav-btn menu-down') {
                    event.target.setAttribute('class','nav-btn menu-up');
        
                    mobileMenu.classList.add('inactive');
                    menuIcon.classList.remove('inactive');
                    crossIcon.classList.add('inactive');        
                }
            });

            /* END Mobile Menu */
            clearInterval(checkExist);
        }
    }, 100); // check every 100ms


});