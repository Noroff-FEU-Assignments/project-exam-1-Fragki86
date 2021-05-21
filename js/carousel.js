const carouselAPI = "https://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe?per_page=1&offset=";
const carousel = document.querySelector(".carousel-container");
const dots = document.querySelector(".dots-container");
const activeDot = document.querySelector(".active-dot");


let offset = 12;



async function getCarousel() {
    try {
        const response = await fetch(carouselAPI + offset);
        const carouselRecipe = await response.json();
        // console.log(carouselRecipe)
        carousel.innerHTML = "";

        carouselRecipe.forEach(function(carInfo) {

            carousel.innerHTML += `
                        <div class="carousel-buttons">
                            <button id="prev-slide"><i class="fas fa-angle-left" aria-label="previous slide"></i></button>
                            <button id="next-slide"><i class="fas fa-angle-right" aria-label="previous slide"></i></button>
                        </div>
                        <div class="par">
                            
                        <a href="recipe-details.html?id=${carInfo.id}"><img src="${carInfo.recipe.image_url}" alt="${carInfo.recipe.name}" class="carousel-main-img"></a>
                            
                                <div class="sub">
                                    <div class="info">
                                        <a href="recipe-details.html?id=${carInfo.id}">
                                        <h2>${carInfo.recipe.name}</h2>
                                        </a>
                                        ${carInfo.recipe.summary}
                                    </div>
                                    <div class="cooking-info-carousel">
                                        <div class="cook-time-car">
                                            <img src="images/Icon-stopwatch.png" alt="stopwatch"><p>${carInfo.recipe.total_time}'<p>
                                        </div>
                                        <div class="difficulty-car">
                                            <img src="images/Icon-chef.png" alt="chefs-hat"><p>${carInfo.recipe.custom_time_label}</p>
                                        </div>
                                        <div class="portions-car">
                                            <img src="images/Icon-spoon-fork.png" alt="spoon and fork"><p>${carInfo.recipe.servings}</p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </a>`
        })

        /* ----------------- Button functionality ----------------- */
        const prevBtn = document.querySelector("#prev-slide");
        const nextBtn = document.querySelector("#next-slide");

        nextBtn.addEventListener("click", () => {
            if (offset >= 12 && offset < 14) {
                offset++
            } else if (offset === 14) {
                offset === 12
            }

            
            getCarousel();
            
        });
        
        prevBtn.addEventListener("click", () => {
            if (offset > 12 && offset <= 14) {
                offset--
            }
            getCarousel();
        });

        if (offset === 12) {
            prevBtn.style.opacity = "0";
        }

        if (offset === 14) {
            nextBtn.style.display = "none";
        }

       /* ----------------- Dots functionality ----------------- */
        

    //    const dots = document.querySelector(".dot");
    //         const activeDot = document.querySelector(".active-dot");
            

    //     for (let i = 0; i < dots.length; i++) {
           
    //         if (offset===13) {
    //             dots[0].classlist.add("active-dot")
    //         }
    //     }

        } catch(error) {
            console.log("Error");
        }
}

getCarousel();