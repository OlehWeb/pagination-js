import { paginate } from "./pagination.js";

window.addEventListener("DOMContentLoaded", async () => {
    const postsElement = document.querySelector(".posts");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const posts = await response.json();

    const renderDefaultPosts = (posts, renderElement) => {
        for (const post in posts) {
            const li = document.createElement("li");

            li.className = "post";
            li.innerHTML = `
                <span class="post__index">${posts[post].id}</span>
                <h4 class="post__title">${posts[post].title}</h4>
                <p class="post__description">${posts[post].body}</p>
            `;

            renderElement.append(li);
        }
    };

    const renderPost = (first, last) => {
        const newPosts = posts.slice(first, last);
        postsElement.innerHTML = "";

        for (const post in newPosts) {
            const li = document.createElement("li");

            li.className = "post";
            li.innerHTML = `
                <span class="post__index">${newPosts[post].id}</span>
                <h4 class="post__title">${newPosts[post].title}</h4>
                <p class="post__description">${newPosts[post].body}</p>
            `;

            postsElement.append(li);
        }
    };

    renderDefaultPosts(posts.slice(0, 9), postsElement);
    paginate(posts, renderPost);
});
