//1// Hamburger menu activation.
document.querySelector('.header__menu-button').addEventListener('click', function () {
  this.classList.toggle('is-active');
  document.querySelector('.header__menu-mobile').classList.toggle('visible');
});


//2// Animation of logo inside header.
let logo = document.querySelectorAll(".header__logo")[0];


//2.1// Function for throttling the animation start.
function throttle(callback, limit) {
  let wait = false;
  return function () {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  }
}


//2.2// Function for debouncing the animation end.
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this, args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//2.3// Function for asigning class to start animation.
let add_class = function () {
  logo.classList.add('animating');
};


//2.4// Function for removing class to start animation next time.
let remove_class = function () {
  logo.classList.remove('animating');
};


//2.5// This is experimental, but important function. It helps to track if user mouse cursor coordinates were same as logo position and blocks the event asignment. The event is triggered only if user's cursor leaves the logo, and enters again. If the user clicked on the logo on the index page, the logo could be animated several times, which could lead to an edgy and broken animation.
function handler(e) {
  e = e || window.event;
  let rect = logo.getBoundingClientRect();
  let pageX = e.pageX;
  let pageY = e.pageY;
  if (pageX > rect.right || pageX < rect.left && pageY > rect.bottom || pageY < rect.top) {
    logo.addEventListener("mouseenter", throttle(add_class, 1000));
    logo.addEventListener("mouseleave", debounce(remove_class, 400));
  } else {
    logo.addEventListener("mouseleave", function () {
      logo.addEventListener("mouseenter", throttle(add_class, 1000));
      logo.addEventListener("mouseleave", debounce(remove_class, 400));
    });
  }
}


//2.6// Triggering main event to start animation.
document.body.addEventListener('mouseenter', handler);


//3// Animation of buttons inside header and footer.
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




