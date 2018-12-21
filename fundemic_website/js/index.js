document.querySelector(' .cookie__icon').addEventListener('click', function () {
    document.querySelector('.cookie').classList.add('animated');
});

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
            peek: { before: 50, after: 50 }
        },
        991: {
            perView: 2,
            gap: '20',
            peek: { before: 150, after: -70 }
        },
        500: {
            gap: '15',
            focusAt: 'center',
            peek: { before: 50, after: 50 },
            perView: 1
        },
        400: {
            gap: '15',
            focusAt: 'center',
            perView: 1,
            peek: { before: 0, after: 0 }
        }
    }
});
glide.mount();

let content1 = document.getElementById("scroll");
let content2 = document.getElementById("scroll2");
document.addEventListener("scroll", function () {

    let scrolled = window.pageYOffset;
    let position1 = content1.getBoundingClientRect().top;
    let position2 = content2.getBoundingClientRect().top;
    if (position1 <= 300) {
        content1.classList.add('animating');
    }
    else{
        content1.classList.remove('animating');
    }
    if (position2 <= 200) {
        content2.classList.add('animating');
    }
    else{
        content2.classList.remove('animating');
    }
});
for (let i = 0; i <= 21; i++) {
    let path = document.querySelectorAll('.hero__background--desktop > *')[i];
    let x = path.getBBox().x;
    let y = path.getBBox().y;
    let w = path.getBBox().width;
    let h = path.getBBox().height;
    let xw = x + w / 2;
    let yh = y + h / 2;
    path.style = 'transform-origin: ' + xw + 'px ' + yh + 'px';
}

let svg1 = document.getElementById("animated-button1");
let svg3 = document.getElementById("animated-button3");
let svg5 = document.getElementById("animated-button5");
let svg7 = document.getElementById("animated-button7");

Snap(svg1);
Snap(svg3);
Snap(svg5);
Snap(svg7);

let visible1 = Snap.select('#visible1');
let visible2 = Snap.select('#visible2');
let visible3 = Snap.select('#visible3');
let visible4 = Snap.select('#visible4');
let visible5 = Snap.select('#visible5');
let visible6 = Snap.select('#visible6');
let visible7 = Snap.select('#visible7');
let visible8 = Snap.select('#visible8');

svg1.addEventListener('mouseover',function() {
      visible1.animate({ d: invisible_d }, 1000, mina.backout);
      visible2.animate({ d: invisible_d }, 1000, mina.backout);
});
svg1.addEventListener('mouseout',function() {
      visible1.animate({ d: visible_d }, 1000, mina.backout);
      visible2.animate({ d: visible_d }, 1000, mina.backout);
});

svg3.addEventListener('mouseover',function() {
      visible3.animate({ d: invisible_d }, 1000, mina.backout);
      visible4.animate({ d: invisible_d }, 1000, mina.backout);
});
svg3.addEventListener('mouseout',function() {
      visible3.animate({ d: visible_d }, 1000, mina.backout);
      visible4.animate({ d: visible_d }, 1000, mina.backout);
});

svg5.addEventListener('mouseover',function() {
      visible5.animate({ d: invisible_d }, 1000, mina.backout);
      visible6.animate({ d: invisible_d }, 1000, mina.backout);
});
svg5.addEventListener('mouseout',function() {
      visible5.animate({ d: visible_d }, 1000, mina.backout);
      visible6.animate({ d: visible_d }, 1000, mina.backout);
});

svg7.addEventListener('mouseover',function() {
      visible7.animate({ d: invisible_d }, 1000, mina.backout);
      visible8.animate({ d: invisible_d }, 1000, mina.backout);
});
svg7.addEventListener('mouseout',function() {
      visible7.animate({ d: visible_d }, 1000, mina.backout);
      visible8.animate({ d: visible_d }, 1000, mina.backout);
});


