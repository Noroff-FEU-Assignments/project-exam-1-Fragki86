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


