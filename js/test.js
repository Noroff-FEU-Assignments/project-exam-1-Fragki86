// From Dennis
const apiUrl =
    "your url";

let length = 4;
let offset = 0;

const buttonPrevious = document.querySelector("#button-previous");
const buttonNext = document.querySelector("#button-next");

async function fetchApi(url) {
    try {
        const data = await fetch(
            url + `posts?per_page=${length}&offset=${offset}&_embed`
        );
        const json = await data.json();



        // Validate Buttons visibility
        if (offset === 0) {
            buttonPrevious.style.display = "none";
        } else {
            buttonPrevious.style.display = "block";
        }
        if (json.length < 4) {
            buttonNext.style.display = "none";
        } else {
            buttonNext.style.display = "block";
        }


    } catch (error) {
        console.log(error);
    }
}

buttonPrevious.addEventListener("click", () => {
    if (offset >= 4) {
        offset -= 4;
    }
    fetchApi(apiUrl);
});
buttonNext.addEventListener("click", () => {
    offset += 4;
    fetchApi(apiUrl);
});

fetchApi(apiUrl);



// From Kasper
const loader = document.querySelector(".loader")
const loaderSmall = document.querySelector(".loader-small")
const button = document.querySelector("button")
const filter = document.querySelector("#filter")
let page = 1
let totalPages = null;

const fetchFilteredPosts = async (page, order) => {
    try {
        const res = await fetch(`${POSTS}?page=${page}&order=${order}&_embed`);
        const json = await res.json();
        totalPages = res.headers.get("x-wp-totalpages")
        loader.remove()
        return json;
    } catch (err) {
        console.log(err)
    }
}

const populateFilteredPosts = async (order) => {
    page = 1
    const container = document.querySelector("#results")
    const posts = await fetchFilteredPosts(page, order)
    container.innerHTML = ""
    button.innerHTML = "Load more"
    posts.forEach(post => container.innerHTML += createPost(post))
}

const appendFilteredPosts = async (order) => {
    const container = document.querySelector("#results")
    const posts = await fetchFilteredPosts(page, order)
    posts.forEach(post => container.innerHTML += createPost(post))
}

const loadMore = async () => {
    if (page >= totalPages) return button.innerHTML = "No more posts"
    try {
        page++
        button.innerHTML = "Loading... <div class='loader-double'></div>"
        await appendFilteredPosts(filter.value)
        button.innerHTML = "Load more"
    } catch (err) {
        button.innerHTML = "No more posts"
    }
}

const handleFilter = () => populateFilteredPosts(filter.value)



filter.addEventListener("input", handleFilter)
button.addEventListener("click", loadMore)
populateFilteredPosts(filter.value)



// From Sara
const resultsContainer = document.querySelector(".blog-posts");
const buttonMore = document.querySelector("button");

buttonMore.style.display = "none";

const apiUrl =
 "https://sanobo.no/weddingblog/wp-json/wp/v2/posts?per_page=15&_embed";

async function fetchApi(url) {
    try {
        const response = await fetch(url);
        const results = await response.json();

        console.log(results);

        resultsContainer.innerHTML = "";
        buttonMore.style.display = "block";

        for (let i = 0; i < 10; i++) {

            const formatDate = new Date(results[i].date).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            resultsContainer.innerHTML += 
                `<div class="post">
                <div><a href="blog-post.html?id=${results[i].id}"><img src="${results[i]._embedded["wp:featuredmedia"][0].source_url}" 
                alt="${results[i]._embedded["wp:featuredmedia"][0].alt_text}" /></a></div>
                <div class="text"><h2>${results[i].title.rendered}</h2>
                <p>${formatDate}</p>
                <p>${results[i].excerpt.rendered} <a href="blog-post.html?id=${results[i].id}">Read more</a></p></div></div>`
        }
        
    } catch (error) {
        console.log(error);
    }
}

buttonMore.addEventListener("click", () => {
    async function fetchApi(url) {
        try {
            const response = await fetch(url);
            const results = await response.json();
    
            console.log(results);
    
            resultsContainer.innerHTML = "";
    
            for (let i = 0; i < results.length; i++) {
    
                const formatDate = new Date(results[i].date).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });

                buttonMore.style.display = "none";

                resultsContainer.innerHTML += 
                    `<div class="post">
                    <div><a href="blog-post.html?id=${results[i].id}"><img src="${results[i]._embedded["wp:featuredmedia"][0].source_url}" 
                    alt="${results[i]._embedded["wp:featuredmedia"][0].alt_text}" /></a></div>
                    <div class="text"><h2>${results[i].title.rendered}</h2>
                    <p>${formatDate}</p>
                    <p>${results[i].excerpt.rendered} <a href="blog-post.html?id=${results[i].id}">Read more</a></p></div></div>`
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    fetchApi(apiUrl);
});

fetchApi(apiUrl);