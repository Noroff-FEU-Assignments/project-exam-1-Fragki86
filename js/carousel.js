const carouselAPI = "https://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe?per_page=1&offset=";


const wholeSection = document.querySelector("#latestRecipes");
const carousel = document.querySelector(".carousel-container");
const carouselBtns = document.querySelector(".carousel-buttons");
const dots = document.querySelector(".dots-container");
const activeDot = document.querySelector(".active-dot");


let offset = 12;


async function getCarousel() {
    try {
        const response = await fetch(carouselAPI + offset);
        const carouselRecipe = await response.json();
        console.log(carouselRecipe)
        carousel.innerHTML = "";

        carouselRecipe.forEach(function(carInfo) {

            carousel.innerHTML += `
                        <div class="carousel-buttons">
                            <button id="prev-slide"><i class="fas fa-angle-left"></i></button>
                            <button id="next-slide"><i class="fas fa-angle-right"></i></button>
                        </div>
                        <div class="par">
                            
                            <img src="${carInfo.recipe.image_url}">
                            
                                <div class="sub">
                                    <div class="info">
                                        <a href="recipe-details.html?id=${carInfo.id}">
                                        <h2>${carInfo.recipe.name}</h2>
                                        </a>
                                        ${carInfo.recipe.summary}
                                    </div>
                                    <div class="cooking-info-carousel">
                                        <div class="cook-time-car">
                                            <img src="images/Icon-stopwatch.png"><p>${carInfo.recipe.total_time}'<p>
                                        </div>
                                        <div class="difficulty-car">
                                            <img src="images/Icon-chef.png"><p>${carInfo.recipe.custom_time_label}</p>
                                        </div>
                                        <div class="portions-car">
                                            <img src="images/Icon-spoon-fork.png"><p>${carInfo.recipe.servings}</p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </a>`
        })


        const prevBtn = document.querySelector("#prev-slide");
        const nextBtn = document.querySelector("#next-slide");

        nextBtn.addEventListener("click", () => {
            if (offset >= 12 && offset < 14) {
                offset++
            }
            getCarousel();
        
        });
        
        prevBtn.addEventListener("click", () => {
            if (offset > 12 && offset <= 14) {
                offset--
            }
            getCarousel();
        });

       
            
        } catch(error) {
            console.log("Error");
        }
}

getCarousel();