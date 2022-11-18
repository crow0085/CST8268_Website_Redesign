$(document).ready(function() {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});

window.addEventListener('DOMContentLoaded', (event) => {
    /* Mobile Menu */
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
});

$(function () {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});
