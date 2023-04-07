import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPosts } from "../data/offers.js";

const catalogTemplate = (posts) => html` <section id="dashboard-page">
  <h1 class="title">All Posts</h1>

  <div class="all-posts">
  ${posts.length > 0 ? posts.map(postCard) : html`
  <h1 class="title no-posts-title">No posts yet!</h1>`}
  </div>

</section>`;

const postCard = (post) => html` 
<div class="post">
  <h2 class="post-title">${post.title}</h2>
  <img class="post-image" src="${post.imageUrl}" alt="Material Image" />
  <div class="btn-wrapper">
    <a href="/catalog/${post._id}" class="details-btn btn">Details</a>
  </div>
</div>`;

export async function catalogPage(ctx){
  const posts = await getAllPosts();
  ctx.render(catalogTemplate(posts))
}
