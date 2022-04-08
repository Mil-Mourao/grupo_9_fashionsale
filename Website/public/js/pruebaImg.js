let images = document.querySelectorAll('.small-pic');
let mainImage = document.getElementById('focus-pic');

for(let index= 0 ; index < images.length ; index++){
    images[index].addEventListener("click",function () {
        mainImage.src = images[index].src
    })
}