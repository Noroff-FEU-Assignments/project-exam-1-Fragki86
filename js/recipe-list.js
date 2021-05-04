const recipeContainer = document.querySelector(".recipes-list");
const callAPI = "http://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe?per_page=20";

async function getRecipes() {
    try {
        const response = await fetch(callAPI);
        const recipes = await response.json();
        recipeContainer.innerHTML = "";

        recipes.forEach(function(recipeInfo) {
            recipeContainer.innerHTML  +=`
                                        <div class="individual-container">
                                            <a href="recipe-details">
                                            <h2>${recipeInfo.recipe.name}</h2>
                                            <img class="rendered-img" src=${recipeInfo.recipe.image_url}>
                                            
                                            </a>
                                            <div class="cooking-info">
                                                <div class="cook-time">
                                                    <img src="images/Icon-stopwatch.png"><p>${recipeInfo.recipe.total_time}<p>
                                                </div>
                                                <div class="difficulty">
                                                    <img src="images/Icon-chef.png"><p>${recipeInfo.recipe.custom_time_label}</p>
                                                </div>
                                                <div class="portions">
                                                    <img src="images/Icon-spoon-fork.png"><p>${recipeInfo.recipe.servings}</p>
                                                </div>
                                            </div>
                                        </div>` 
        })
        
        console.log(recipes);


    } catch(error) {
        console.log("Error");
    }
}

getRecipes();