let svg1 = document.getElementById("animated-button1");

Snap(svg1);

let visible1 = Snap.select('#visible1');
let visible2 = Snap.select('#visible2');

svg1.addEventListener('mouseover', function () {
    visible1.animate({d: invisible_d}, 400, mina.backout);
    visible2.animate({d: invisible_d}, 400, mina.backout);
});

svg1.addEventListener('mouseout', function () {
    visible1.animate({d: visible_d}, 400, mina.backout);
    visible2.animate({d: visible_d}, 400, mina.backout);
});