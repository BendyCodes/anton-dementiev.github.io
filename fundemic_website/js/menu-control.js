// Hamburger menu activation.
document.querySelector('.header__menu-button').addEventListener('click', function () {
  this.classList.toggle('is-active');
  document.querySelector('.header__menu-mobile').classList.toggle('visible');
});

// Animation of logo inside header.
let logo = document.querySelectorAll(".logo")[0];
let big = document.querySelectorAll(".logo__big-line")[0];
let smile = document.querySelectorAll(".logo__smile")[0];
let circle_left = document.querySelectorAll(".logo__circle--left")[0];
let circle_right = document.querySelectorAll(".logo__circle--right")[0];

// Checking if browser is not edge or ie .
if (!document.documentMode && !/Edge/.test(navigator.userAgent)) {
  // Creating function for asigning classes.
  let if_check = function (el) {
    if (el.classList.contains("logo-animating")) {
      el.classList.remove("logo-animating");
      el.classList.add("logo-animating-second");
    } else {
      el.classList.remove("logo-animating-second");
      el.classList.add("logo-animating");
    }
  };
  //- Asigning css values of transform-origin property to each circle in animation. Both mobile and desktop backgrounds are being targeted.
  for (let i = 0; i < 2; i++) {
    let path = document.querySelectorAll(".logo__circle")[i];
    if (path) {
      let x = path.getBBox().x;
      let y = path.getBBox().y;
      let w = path.getBBox().width;
      let h = path.getBBox().height;
      let xw = x + w / 2;
      let yh = y + h / 2;
      path.style = "transform-origin: " + xw + "px " + yh + "px";
    }
  }
  // Event handler for animation.
  logo.classList.add('animating');
  logo.addEventListener("mouseenter", function () {
    big.classList.add('logo__stroke');
    smile.classList.add('logo__stroke');
    circle_left.classList.add('logo__circle--scale');
    circle_right.classList.add('logo__circle--scale');
    if_check(big);
    if_check(smile);
    if_check(circle_left);
    if_check(circle_right);
  });
}


// Animation of buttons inside header and footer.
let header__button = document.getElementById("animated-button9");
let footer__button = document.getElementById("animated-button11");

Snap(header__button);
Snap(footer__button);

let visible9 = Snap.select('#visible9');
let visible10 = Snap.select('#visible10');
let visible11 = Snap.select('#visible11');
let visible12 = Snap.select('#visible12');
let visible_d = 'M51.523,52.167c40.648,0,81.296,0,121.945,0';
let invisible_d = 'M53.023,45.23 c40.349,18.432,80.994,18.568,121.945,0';

header__button.addEventListener('mouseenter', function () {
  visible9.animate({d: invisible_d}, 400, mina.backout);
  visible10.animate({d: invisible_d}, 400, mina.backout);
});
header__button.addEventListener('mouseleave', function () {
  visible9.animate({d: visible_d}, 400, mina.backout);
  visible10.animate({d: visible_d}, 400, mina.backout);
});

footer__button.addEventListener('mouseenter', function () {
  visible11.animate({d: invisible_d}, 400, mina.backout);
  visible12.animate({d: invisible_d}, 400, mina.backout);
});
footer__button.addEventListener('mouseleave', function () {
  visible11.animate({d: visible_d}, 400, mina.backout);
  visible12.animate({d: visible_d}, 400, mina.backout);
});



