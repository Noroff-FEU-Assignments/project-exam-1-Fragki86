const detailsContainer = document.querySelector(".details-container");
const relatedRecipes = document.querySelector(".related");
const biggerImage = document.querySelector(".bigger-img");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);


/* ----------------- API call ----------------- */
const id = params.get("id");
const recipeDetailsURL = "https://easy-meals-recipes.georgiosf.no/wp-json/wp/v2/wprm_recipe/" + id ;

async function getDetails() {
    try {
        const response = await fetch(recipeDetailsURL);
        const details = await response.json();

        allDetails(details)

    } catch(error) {
        console.log("ERROR")
    }
}



/* ----------------- Making the img bigger ----------------- */
getDetails().then(() => {
    const imgBig = document.querySelector(".img-info-grid img")

    imgBig.addEventListener("click", zoomImg);
    
    function zoomImg() {
        biggerImage.style.display = "block";
    }    
});




/* ----------------- Exit zoomed image ----------------- */
document.addEventListener('mouseup', clear)

function clear() {
    const closeModal = document.querySelector(".bigger-img");
    if (!closeModal.contains(clear.target)) {
        closeModal.style.display = 'none';
    }
};



/* ----------------- Fetching the details ----------------- */
function allDetails(details) {
    let methodDetails = details.recipe.instructions_flat;
    let ingredientsList = details.recipe.ingredients_flat;
    
    let method = "";
    let ingredients = "";

    for (let i = 0; i < methodDetails.length; i++) {
        method += methodDetails[i].text;
    }

    for (let v = 0; v < ingredientsList.length; v++) {
        ingredients += "<ul class='ingredients-u-list'>" + "<span>" + ingredientsList[v].amount + " " + ingredientsList[v].unit + "</span>" + " " + ingredientsList[v].name + " " + ingredientsList[v].notes + "</ul>";
    }

        detailsContainer.innerHTML = `
                <div class="recipe-details-container">
                    <h1>${details.recipe.name}</h1>
                    <div class="img-info-grid">
                        <img class="details-img" src="${details.recipe.image_url}" alt="${details.recipe.name}">
                        <h2>- Info -</h2>
                        <div class="recipe-info">
                            ${details.recipe.summary}
                            <div class="cooking-info">
                                <div class="cook-time">
                                    <img src="images/Icon-stopwatch.png" alt="stopwatch"><p>${details.recipe.total_time}'<p>
                                </div>
                                <div class="difficulty">
                                    <img src="images/Icon-chef.png" alt="chefs-hat"><p>${details.recipe.custom_time_label}</p>
                                </div>
                                <div class="portions">
                                    <img src="images/Icon-spoon-fork.png" alt="spoon and fork"><p>${details.recipe.servings}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mobile-details">
                        <div class="tabs">
                            <button class="tab-button" onclick="toggleTab(event, 'ingredients-mobile')">-Ingredients-</button>
                            <button class="tab-button" onclick="toggleTab(event, 'method-mobile')">-Method-</button>
                        </div>
                        <div class="tab-content" id="method-mobile">
                            <ul>${method}</ul>
                            <div id="good-luck">
                                <img src="images/star.png" alt="star"><h4>Good Luck</h4><img src="images/star.png" alt="star">
                            </div>
                        </div>
                        <div class="tab-content" id="ingredients-mobile">
                            ${ingredients}
                            <div id="good-luck">
                                <img src="images/star.png" alt="star"><h4>Good Luck</h4><img src="images/star.png" alt="star"> 
                            </div>
                        </div>
                    </div>
                    <div class="method-ingre-grid">
                            <div class="method">
                                <h2>- Method -</h2>
                                <ul>${method}</ul>
                                <div id="good-luck">
                                    <img src="images/star.png" alt="star"><h4>Good Luck</h4><img src="images/star.png" alt="star">
                                </div>
                            </div>
                            <div class="ingredients">
                                <h2>- Ingredients -</h2>
                                ${ingredients}
                            </div>
                    </div>
                </div>`
        

        biggerImage.innerHTML = `<img class="zoomed-img" src="${details.recipe.image_url}" alt="${details.recipe.name}">`


/* ----------------- Change the page title ----------------- */
    const newTitle = document.querySelector("title");    

    function pageTitleUpdate() {
        newTitle.innerHTML = details.recipe.name;
    } 
    pageTitleUpdate();
}



/* ----------------- Mobile Tabs ----------------- */
function toggleTab(event, show) {
    let i;
    let tabcontent;
    let tabBtn;
  
    
    tabcontent = document.querySelectorAll(".tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    
    tabBtn = document.querySelectorAll(".tab-button");
    for (i = 0; i < tabBtn.length; i++) {
        tabBtn[i].className = tabBtn[i].className.replace(" active", "");
    }
  
    
    document.getElementById(show).style.display = "block";
    event.currentTarget.className += " active";
}



