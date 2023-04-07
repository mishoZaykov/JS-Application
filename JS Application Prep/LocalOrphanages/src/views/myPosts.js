import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";
import { getUserPost } from "../data/offers.js";

const myPostsTemplate = (posts) => html` <section id="my-posts-page">
  <h1 class="title">My Posts</h1>

  <div class="my-posts">
  ${posts.length > 0 ? posts.map(myPosts) : html` 
  <h1 class="title no-posts-title">You have no posts yet!</h1>`}
  </div>

</section>`;

const myPosts = (post) => html` 
<div class="post">
  <h2 class="post-title">${post.title}</h2>
  <img class="post-image" src="${post.imageUrl}" alt="Material Image" />
  <div class="btn-wrapper">
    <a href="/catalog/${post._id}" class="details-btn btn">Details</a>
  </div>
</div>`;

export async function myPostsPage(ctx){
  const userData = getUserData();
  const id = userData._id;
  const posts = await getUserPost(id);

  ctx.render(myPostsTemplate(posts))
}
