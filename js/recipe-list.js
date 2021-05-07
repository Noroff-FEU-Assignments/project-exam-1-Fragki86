const recipeContainer = document.querySelector(".recipes-list");
const callAPI = "http://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe?per_page=20";
// const callAPI = "http://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe?per_page=";
const showMoreBtn = document.querySelector("#showMoreBtn")

// const extraRec = `?per_page=`;
// let recNumber = 6;
// console.log(recNumber);


async function getRecipes() {
    try {
        const response = await fetch(callAPI);
        const recipes = await response.json();


        recipeContainer.innerHTML = "";

        for (let i = 0; i < recipes.length; i++) {
            console.log(recipes[i])
            if (i===6) {
                break
            } 

            function showMoreRecipes() {
                for (let i = 6; i < recipes.length; i++)

                recipeContainer.innerHTML += `
                <a href="recipe-details.html?id=${recipes[i].id}">
                <div class="individual-container">
                 <div class="ind-img">
                     <img class="rendered-img" src=${recipes[i].recipe.image_url}>
                 </div>
                    <div class="ind-h2">
                        <h2>${recipes[i].recipe.name}</h2>
                    </div>

                    <div class="cooking-info">
                        <div class="cook-time">
                            <img src="images/Icon-stopwatch.png"><p>${recipes[i].recipe.total_time}'<p>
                        </div>
                        <div class="difficulty">
                            <img src="images/Icon-chef.png"><p>${recipes[i].recipe.custom_time_label}</p>
                        </div>
                        <div class="portions">
                            <img src="images/Icon-spoon-fork.png"><p>${recipes[i].recipe.servings}</p>
                        </div>
                    </div>
                </div>
                </a>` 

                showMoreBtn.disabled = true;
            }
            
            recipeContainer.innerHTML += `
                            <a href="recipe-details.html?id=${recipes[i].id}">
                            <div class="individual-container">
                             <div class="ind-img">
                                 <img class="rendered-img" src=${recipes[i].recipe.image_url}>
                             </div>
                                <div class="ind-h2">
                                    <h2>${recipes[i].recipe.name}</h2>
                                </div>
    
                                <div class="cooking-info">
                                    <div class="cook-time">
                                        <img src="images/Icon-stopwatch.png"><p>${recipes[i].recipe.total_time}'<p>
                                    </div>
                                    <div class="difficulty">
                                        <img src="images/Icon-chef.png"><p>${recipes[i].recipe.custom_time_label}</p>
                                    </div>
                                    <div class="portions">
                                        <img src="images/Icon-spoon-fork.png"><p>${recipes[i].recipe.servings}</p>
                                    </div>
                                </div>
                            </div>
                            </a>` 



        }

    } catch(error) {
        console.log("Error");
    }


    showMoreBtn.addEventListener("click", showMoreRecipes);
    

}
getRecipes()







// getRecipes(callAPI).then(() => {

    // showMoreBtn.addEventListener("click", showMoreRecipes);

//     function showMoreRecipes() {
//         recNumber = recNumber + 3


//         console.log(recNumber);
//     }

// });


