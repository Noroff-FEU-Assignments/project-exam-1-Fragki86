const detailsContainer = document.querySelector(".details-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const recipeDetailsURL = "http://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe/" + id ;

async function getDetails() {
    try {
        const response = await fetch(recipeDetailsURL);
        const details = await response.json();
        
        let method = details.recipe.instructions_flat;
        console.log(method)

        // for (let i = 0; i < method.length; i++) {
        //     console.log(method);
        // }









        allDetails(details);
    } catch(error) {
        console.log("ERROR")
    }
}

getDetails();


function allDetails(details) {
        detailsContainer.innerHTML = `
                <div class="recipe-details-container">
                    <h1>${details.recipe.name}</h1>
                    <div class="img-info-grid">
                        
                        <h2>- Info -</h2>
                        <div class="recipe-info">
                            ${details.recipe.summary}
                        </div>
                    </div>
                    <div class="method-ingre-grid">
                        <h2>- Method -</h2>
                        <div class="method">
                            ${details.recipe.instructions_flat[0].text}

                        </div>
                </div>`
}