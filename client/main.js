$(function() {
    $('body').removeClass('fade-out');
});

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function toggleNav() {

    let sideNav = document.getElementById("mySidenav");
    if (sideNav.style.width === "250px") {
        document.getElementById("mySidenav").style.width = "0";

    }
    else {
    document.getElementById("mySidenav").style.width = "250px";
    }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}