const burgerBtn = document.querySelector(".mobile-menu");
const navMobile = document.querySelector(".nav-links");
const navList = document.querySelectorAll(".nav-links li");

burgerBtn.addEventListener ("click", fadeInMenu);
burgerBtn.addEventListener ("click", stylishLinks);

function fadeInMenu() {
    navMobile.classList.toggle("nav-visible");
}

function stylishLinks() {
    navList.forEach(function(links, length){
        console.log(length);
        if (links.style.animation) {
            links.style.animation = '';
        } else {
            links.style.animation = `fade-in 0.5s forwards  ${length / 7 + 0.6}s`
        }

    })
} 

// const navSlide = () => {
//     const burgerBtn = document.querySelector(".mobile-menu");
//     const navMobile = document.querySelector(".nav-links");

//     burgerBtn.addEventListener ("click", () => {
//         navMobile.classList.toggle("nav-visible");
//     });


// }
// navSlide()