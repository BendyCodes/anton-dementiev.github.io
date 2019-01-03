//- This selector is used to search a specific element position to start a countup animation with countup.js library.
let content = document.getElementById("scroll");

//- Property that disables easing function for counter animation.
let options = {
    useEasing: false
};

//- Object for counter animation initialisation.
let demo = new CountUp('animation-text', 0, 100, 0, 3.5, options);

//- Variables for checking current scroll position.
let scrolled = window.pageYOffset;
let position = window.pageYOffset + content.getBoundingClientRect().top;

//- Check if user reloaded page at the moment when his viewport was at the counter animation section. This loads counter animation without user required to scroll.
if (scrolled > position - 200) {

    //- Adding class for counter animation.
    content.classList.add('animating');

    //- Counter animation initialisation.
    demo.start();
}

//- Event that checks if user have scrolled to a section with counter.
document.addEventListener("scroll", function () {
    scrolled = window.pageYOffset;
    position = window.pageYOffset + content.getBoundingClientRect().top;
    if (scrolled > position - 200) {
        content.classList.add('animating');
        demo.start();
    }
});


//- Asigning css values of transform-origin property to each circle in animation. Both mobile and desktop backgrounds are being targeted.
for (let i = 0; i < 29 * 2; i++) {
    let path = document.querySelectorAll('.circles__image--desktop path, .circles__image--mobile path')[i];
    if (path) {
        let x = path.getBBox().x;
        let y = path.getBBox().y;
        let w = path.getBBox().width;
        let h = path.getBBox().height;
        let xw = x + w / 2;
        let yh = y + h / 2;
        path.style = 'transform-origin: ' + xw + 'px ' + yh + 'px';
    }
}






