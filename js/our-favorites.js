const favoriteRecipesContainer = document.querySelector(".favorite-recipes");
const callAPI = "http://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe?per_page=3&offset=9";


async function getFavorite() {
    try {
        const response = await fetch(callAPI);
        const recipesExtra = await response.json();
        console.log(recipesExtra)
        favoriteRecipesContainer.innerHTML = "";
        
        // for (let i = 0; i < )


        recipesExtra.forEach(function(recipeInfo) {
            favoriteRecipesContainer.innerHTML  +=`
                    <a href="recipe-details.html?id=${recipeInfo.id}">
                    <div class="related-recipes-container">
                        <div class="rel-img">
                            <img class="rel-rend-img" src=${recipeInfo.recipe.image_url}>
                        </div>
                        <div class="rel-h3">
                            <h3>${recipeInfo.recipe.name}</h3>
                        </div>
                    </div>
                    </a>` 
        })

    } catch(error) {
        console.log("Error");
    }
}

getFavorite();