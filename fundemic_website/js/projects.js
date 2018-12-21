let options = {
    useEasing: false
};

let content = document.getElementById("scroll");
let width = window.innerWidth;


let demo = new CountUp('animation-text', 0, 100, 0, 3.5, options);

document.addEventListener("scroll", function() {
    let width = window.innerWidth;
    let scrolled = window.pageYOffset;
    let position = window.pageYOffset + content.getBoundingClientRect().top;
    if (scrolled > position - 200 ) {
        content.classList.add('animating');
        demo.start();
    }
});

for (let i = 0; i < 29; i++) {
    let path = document.querySelectorAll('.circles__image--desktop path')[i];
    if (path){
        let x = path.getBBox().x;
        let y = path.getBBox().y;
        let w = path.getBBox().width;
        let h = path.getBBox().height;
        let xw = x + w / 2;
        let yh = y + h / 2;
        path.style = 'transform-origin: ' + xw + 'px ' + yh + 'px';
    }
}




