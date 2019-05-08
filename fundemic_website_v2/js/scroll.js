//Check if user scrolled to a specific part of the viewport.

let content = document.getElementById("scroll");
document.addEventListener("scroll", function() {

    let scrolled = window.pageYOffset;
    let position = content.getBoundingClientRect().top;

    if (scrolled > position) {
        content.classList.add('animating');
    }
    else{
        content.classList.remove('animating');
    }
});