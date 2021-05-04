const detailsContainer = document.querySelector(".details-container");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);

console.log(params);

const id = params.get("id");

console.log(id);

const recipeDetailsURL = "http://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe/" + id;

async function getDetails() {
    try {
        const response = await fetch(recipeDetailsURL);
        const details = await response.json();
        console.log(details)
        
        allDetails(details);
    } catch(error) {
        console.log("ERROR")
    }
}

getDetails();


// function allDetails(details) {
//         detailsContainer.innerHTML = `${details.recipe.name}`
// }