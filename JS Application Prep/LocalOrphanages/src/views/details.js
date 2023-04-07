import { html } from "../../node_modules/lit-html/lit-html.js";
import { donate, getDonations, getUserDonation } from "../data/donations.js";
import { deletePost, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

const detailsTemplate = (post, onDelete, onDonate) => html` 
<section id="details-page">
  <h1 class="title">Post Details</h1>

  <div id="container">
    <div id="details">
      <div class="image-wrapper">
        <img src="${post.imageUrl}" alt="Material Image" class="post-image" />
      </div>
      <div class="info">
        <h2 class="title post-title">${post.title}</h2>
        <p class="post-description">Description: ${post.description}</p>
        <p class="post-address">Address: ${post.address}</p>
        <p class="post-number">Phone number: ${post.phone}</p>
        <p class="donate-Item">Donate Materials: ${post.donations}</p>
        ${post.canEdit || post.canDonate
          ? html` <div class="btns">
            ${post.canEdit ? html`
              <a href="/catalog/${post._id}/edit" class="edit-btn btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`: null}
        ${post.canDonate ? html` 
              <a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>` : null}
            </div>`: null}
      </div>
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const requests = [
    getById(id),
    getDonations(id),
  ]

  const userData = getUserData();

  if (userData) {
    requests.push(getUserDonation(id, userData._id));
  }

  const [post, donations, hasDonated] = await Promise.all(requests);
  post.donations = donations;

  if(userData){
    post.canEdit = userData._id == post._ownerId;
    post.canDonate = post.canEdit == false && hasDonated == 0;
  }

  update();
  function update(){
    ctx.render(detailsTemplate(post, onDelete, onDonate));
  }

  async function onDelete(){
    const choice = confirm('Are you sure?');

    if(choice){
      await deletePost(id);
      ctx.page.redirect('/catalog')
    }
  }

  async function onDonate(){
    await donate(id);
    post.donations++;
    post.canDonate = false;
    update()
  }
}


