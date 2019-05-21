// Button animation.
let contact_button = document.getElementById("animated-button1");

Snap(contact_button);

let visible1 = Snap.select('#visible1');
let visible2 = Snap.select('#visible2');

contact_button.addEventListener('mouseover', function () {
    visible1.animate({d: invisible_d}, 400, mina.backout);
    visible2.animate({d: invisible_d}, 400, mina.backout);
});

contact_button.addEventListener('mouseout', function () {
    visible1.animate({d: visible_d}, 400, mina.backout);
    visible2.animate({d: visible_d}, 400, mina.backout);
});
