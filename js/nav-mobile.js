const burgerBtn = document.querySelector(".mobile-menu");
const navMobile = document.querySelector(".nav-links");
const navList = document.querySelectorAll(".nav-links li");
const h2 = document.querySelector("#latestRecipes h2");

burgerBtn.addEventListener ("click", fadeInMenu);
burgerBtn.addEventListener ("click", stylishLinks);

function fadeInMenu() {
    navMobile.classList.toggle("nav-visible");
}

function stylishLinks() {
    navList.forEach(function(links, length){
        if (links.style.animation) {
            links.style.animation = '';
        } else {
            links.style.animation = `fade-in 0.3s forwards  ${length / 6 + 0.5}s`
        }

    })
} 



/* ----------------- Roll up menu ----------------- */
// document.addEventListener('mouseup', rollUp)

// function rollUp() {
//     if (!navMobile.contains(clear.target)) {
//         navMobile.style.display = 'none';
//     }
// };