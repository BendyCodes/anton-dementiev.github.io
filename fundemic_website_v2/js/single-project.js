//  Button animation.
let button = document.querySelectorAll(".single .svg");
let buttonNode;

for (let i = 0, j = 1; i<=button.length; i++, j++){

  if (i % 2 !== 0) {

    buttonNode = document.getElementById('animated-button-photo-'+i);

    let test1 = Snap.select('#visible-photo-'+i);
    let test2 = Snap.select('#visible-photo-'+j);

    buttonNode.addEventListener('mouseenter', function () {
      test1.animate({d: invisible_d}, 400, mina.backout);
      test2.animate({d: invisible_d}, 400, mina.backout);
    });

    buttonNode.addEventListener('mouseleave', function () {
      test1.animate({d: visible_d}, 400, mina.backout);
      test2.animate({d: visible_d}, 400, mina.backout);
    });
  }
}





