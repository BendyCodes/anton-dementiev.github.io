document.querySelector('.header__menu-button').addEventListener('click', function () {
    this.classList.toggle('is-active');
    document.querySelector('.header__menu-mobile').classList.toggle('visible');
});

let svg9 = document.getElementById("animated-button9");
let svg11 = document.getElementById("animated-button11");

Snap(svg9);
Snap(svg11);

let invisible9 = Snap.select('#invisible9');
let visible9 = Snap.select('#visible9');
let visible10 = Snap.select('#visible10');
let visible11 = Snap.select('#visible11');
let visible12 = Snap.select('#visible12');
let visible_d = visible9.node.getAttribute('d');
let invisible_d = invisible9.node.getAttribute('d');

svg9.addEventListener('mouseover', function () {
    visible9.animate({d: invisible_d}, 1000, mina.backout);
    visible10.animate({d: invisible_d}, 1000, mina.backout);
});
svg9.addEventListener('mouseout', function () {
    visible9.animate({d: visible_d}, 1000, mina.backout);
    visible10.animate({d: visible_d}, 1000, mina.backout);
});

svg11.addEventListener('mouseover', function () {
    visible11.animate({d: invisible_d}, 1000, mina.backout);
    visible12.animate({d: invisible_d}, 1000, mina.backout);
});
svg11.addEventListener('mouseout', function () {
    visible11.animate({d: visible_d}, 1000, mina.backout);
    visible12.animate({d: visible_d}, 1000, mina.backout);
});



