//  Check if user entered site for the first time.
let firstTime = localStorage.getItem("first_time");
if (!firstTime) {
  document.querySelector('.cookie').classList.add('visible');
  localStorage.setItem("first_time", "not first time");
}

//  Event for closing cookie dialog window.
document.querySelector(' .cookie__icon').addEventListener('click', function () {
  document.querySelector('.cookie').classList.add('invisible');
});

// Slider initialisation.
let glide = new Glide('.glide', {
  type: 'carousel',
  gap: '34',
  perView: 4,
  focusAt: 'center',
  animationDuration: 350,
  animationTimingFunc: 'ease',
  breakpoints: {
    1300: {
      perView: 3,
      gap: '24',
      focusAt: 'center',
      peek: {before: 50, after: 50}
    },
    991: {
      perView: 2,
      gap: '20',
      peek: {before: 150, after: -70}
    },
    500: {
      gap: '15',
      focusAt: 'center',
      peek: {before: 50, after: 50},
      perView: 1
    },
    400: {
      gap: '15',
      focusAt: 'center',
      perView: 1,
      peek: {before: 0, after: 0}
    }
  }
});
glide.mount();


//  Event that checks if user have scrolled to a section with animation and asigns class for this animation.
let content1 = document.getElementById("scroll");
let content2 = document.getElementById("scroll2");
document.addEventListener("scroll", function () {

  let scrolled = window.pageYOffset;
  let position1 = content1.getBoundingClientRect().top;
  let position2 = content2.getBoundingClientRect().top;
  if (position1 <= 300) {
    content1.classList.add('animating');
  } else {
    content1.classList.remove('animating');
  }
  if (position2 <= 200) {
    content2.classList.add('animating');
  } else {
    content2.classList.remove('animating');
  }
});

//  Hero section animation reasignments.
let circle_path = document.querySelectorAll(".hero__background--desktop .circle");
let desktop_background = document.querySelectorAll(".hero__background--desktop")[0];
let hero = document.querySelectorAll(".hero")[0];

if (!document.documentMode ) {
  for (let i = 0; i < circle_path.length; i++) {
    if (circle_path[i]) {
      let x = circle_path[i].getBBox().x;
      let y = circle_path[i].getBBox().y;
      let w = circle_path[i].getBBox().width;
      let h = circle_path[i].getBBox().height;
      let xw = x + w / 2;
      let yh = y + h / 2;
      circle_path[i].style = "transform-origin: " + xw + "px " + yh + "px";
    }
  }
}

// Checking if browser is not ie.
if (!document.documentMode) {
  //  Timeout for hero section animation initialisation.
  setTimeout(function () {
    desktop_background.classList.add('animating');
  }, 220);
}

//  Disable hero section animation for ie.
if (document.documentMode) {
  hero.classList.add('browser-fix');
}

//  Button animation.
let hero_button = document.getElementById("animated-button1");
let project_button = document.getElementById("animated-button3");
let services_button = document.getElementById("animated-button5");
let template_button = document.getElementById("animated-button7");

Snap(hero_button);
Snap(project_button);
Snap(services_button);
Snap(template_button);

//  Because of the limitations that css have, each animation has two paths that are being animated. Each of this path must have unique id, so not to bother with naming it was called by index.
let visible1 = Snap.select('#visible1');
let visible2 = Snap.select('#visible2');
let visible3 = Snap.select('#visible3');
let visible4 = Snap.select('#visible4');
let visible5 = Snap.select('#visible5');
let visible6 = Snap.select('#visible6');
let visible7 = Snap.select('#visible7');
let visible8 = Snap.select('#visible8');

hero_button.addEventListener('mouseenter', function () {
  visible1.animate({d: invisible_d}, 400, mina.backout);
  visible2.animate({d: invisible_d}, 400, mina.backout);
});
hero_button.addEventListener('mouseleave', function () {
  visible1.animate({d: visible_d}, 400, mina.backout);
  visible2.animate({d: visible_d}, 400, mina.backout);
});
project_button.addEventListener('mouseenter', function () {
  visible3.animate({d: invisible_d}, 400, mina.backout);
  visible4.animate({d: invisible_d}, 400, mina.backout);
});
project_button.addEventListener('mouseleave', function () {
  visible3.animate({d: visible_d}, 400, mina.backout);
  visible4.animate({d: visible_d}, 400, mina.backout);
});
services_button.addEventListener('mouseenter', function () {
  visible5.animate({d: invisible_d}, 400, mina.backout);
  visible6.animate({d: invisible_d}, 400, mina.backout);
});
services_button.addEventListener('mouseleave', function () {
  visible5.animate({d: visible_d}, 400, mina.easein);
  visible6.animate({d: visible_d}, 400, mina.easein);
});
template_button.addEventListener('mouseenter', function () {
  visible7.animate({d: invisible_d}, 400, mina.backout);
  visible8.animate({d: invisible_d}, 400, mina.backout);
});
template_button.addEventListener('mouseleave', function () {
  visible7.animate({d: visible_d}, 400, mina.easein);
  visible8.animate({d: visible_d}, 400, mina.easein);
});


