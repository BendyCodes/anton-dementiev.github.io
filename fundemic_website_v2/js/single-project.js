//  Button animation.
let button = document.querySelectorAll(".single .svg");
let buttonNode;

for (let i = 0, j = 1; i<=button.length; i++, j++){

  if (i % 2 !== 0) {

    buttonNode = document.getElementById('animated-button-photo-'+i);

    let path1single = Snap.select('#visible-photo-'+i);
    let path2single = Snap.select('#visible-photo-'+j);

    buttonNode.addEventListener('mouseenter', function () {
      path1single.animate({d: invisible_d}, 400, mina.backout);
      path2single.animate({d: invisible_d}, 400, mina.backout);
    });

    buttonNode.addEventListener('mouseleave', function () {
      path1single.animate({d: visible_d}, 400, mina.backout);
      path2single.animate({d: visible_d}, 400, mina.backout);
    });
  }
}





