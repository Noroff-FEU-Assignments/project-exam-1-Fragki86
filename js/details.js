const detailsContainer = document.querySelector(".details-container");
const relatedRecipes = document.querySelector(".related");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);


/* ----------------- API call ----------------- */
const id = params.get("id");
const recipeDetailsURL = "http://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe/" + id ;

async function getDetails() {
    try {
        const response = await fetch(recipeDetailsURL);
        const details = await response.json();

        // console.log(details)
        allDetails(details)



    } catch(error) {
        console.log("ERROR")
    }
}
getDetails().then(() => {

/* ----------------- Making the img bigger ----------------- */
    const imgBig = document.querySelector(".img-info-grid img")


    imgBig.addEventListener("click", zoomImg);
    function zoomImg() {
        console.log()
    }


});


/* ----------------- Fetching the details ----------------- */
function allDetails(details) {
    let methodDetails = details.recipe.instructions_flat;
    let ingredientsList = details.recipe.ingredients_flat;
    
    let method = "";
    let ingredients = "";

    for (let i = 0; i < methodDetails.length; i++) {
        method += methodDetails[i].text;
    }
    // console.log(method);

    for (let v = 0; v < ingredientsList.length; v++) {
        ingredients += "<table class='ingredients-table'>" + "<tr>" + "<td>" + ingredientsList[v].amount + " " + ingredientsList[v].unit + "</td>" + "<td>" + ingredientsList[v].name + " " + ingredientsList[v].notes + "</td>" + "</tr>" + "</table";
        
        // console.log(ingredientsList[v]);
    }

    // console.log(ingredients);

        detailsContainer.innerHTML = `
                <div class="recipe-details-container">
                    <h1>${details.recipe.name}</h1>
                    <div class="img-info-grid">
                        <img src="${details.recipe.image_url}">
                        <h2>- Info -</h2>
                        <div class="recipe-info">
                            ${details.recipe.summary}
                            <div class="cooking-info">
                                <div class="cook-time">
                                    <img src="images/Icon-stopwatch.png"><p>${details.recipe.total_time}'<p>
                                </div>
                                <div class="difficulty">
                                    <img src="images/Icon-chef.png"><p>${details.recipe.custom_time_label}</p>
                                </div>
                                <div class="portions">
                                    <img src="images/Icon-spoon-fork.png"><p>${details.recipe.servings}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="method-ingre-grid">
                        <div class="method">
                            <h2>- Method -</h2>
                            <ul>${method}</ul>
                            <div id="good-luck">
                                <img src="images/star.png"><h4>Good Luck</h4><img src="images/star.png">
                            </div>
                        </div>
                        <div class="ingredients">
                            <h2>- Ingredients -</h2>
                            ${ingredients}
                        </div>
                </div>`


    const newTitle = document.querySelector("title");
    

/* ----------------- Change the page title ----------------- */
    function pageTitleUpdate() {
        newTitle.innerHTML = details.recipe.name;
    } 
    pageTitleUpdate();
}



