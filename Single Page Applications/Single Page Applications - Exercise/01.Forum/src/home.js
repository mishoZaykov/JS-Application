import { showDetails } from "./details.js";

// const section = document.getElementById("homeView");
// section.querySelector("div .topic-title").addEventListener("click", showDetails);
// const form = section.querySelector("form");
// form.addEventListener("submit", onSubmit);
// section.querySelector('[name="cancel"]').addEventListener("click", clearForm);
// const container = section.querySelector(".topic-container");

const section = document.getElementById('homeView');
section.querySelector('div .topic-title').addEventListener("click", showDetails);
const form = section.querySelector('form');
form.addEventListener("submit", onSubmit);
section.querySelector('[name="cancel"]').addEventListener("click", clearForm);
const container = section.querySelector('.topic-container');

section.remove();

export async function showHome(event) {
  event?.preventDefault();
  document.getElementById("main").replaceChildren("Loading...");

  const response = await fetch(
    "http://localhost:3030/jsonstore/collections/myboard/posts"
  );
  const posts = await response.json();
  container.replaceChildren(...Object.values(posts).map(createPostPreview));

  document.getElementById("main").replaceChildren(section);
}

function createPostPreview(post) {
  const element = document.createElement("div");
  element.className = "topic-name-wrapper";
  element.innerHTML = `
  <div class="topic-name">
  <a href="#" class="normal" id="${post._id}">
      <h2>${post.title}</h2>
  </a>
  <div class="columns">
      <div>
          <p>Date: <time>${post.dateCreated}</time></p>
          <div class="nick-name">
              <p>Username: <span>${post.username}</span></p>
          </div>
      </div>
  </div>
</div>`;

  return element;
}

async function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("topicName").trim();
  const username = formData.get("username").trim();
  const content = formData.get("postText").trim();

  try {
    if (title == "" || username == "" || content == "") {
      throw new Error("The fields must be not empty!");
    }

    const response = await fetch(
      "http://localhost:3030/jsonstore/collections/myboard/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          username,
          content,
          dateCreated: new Date(),
        }),
      }
    );
    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }
    form.reset();
    showHome();
  } catch (error) {
    alert(error.message);
  }
}

function clearForm() {
  form.reset();
}
