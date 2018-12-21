document.querySelector('.ipad__button').addEventListener('click', function () {
    document.querySelector('.ipad__button').style.display = "none";
    document.querySelector('.ipad__thumbnail').style.display = "none";
    document.querySelector('.ipad__video').src+= "?autoplay=1";
})


let glide = new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    rewind: false,
    animationDuration: 350,
    animationTimingFunc: 'ease'
});
glide.mount();
