import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteOffer, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

const detailsTemplate = (offer, onDelete, onApply) => html`
 <section id="details-page" class="details">
            <div class="book-information">
                <h3>${offer.title}</h3>
                <p class="type">Type: ${offer.type}</p>
                <p class="img"><img src="${offer.imageUrl}"></p>
                ${offer.canEdit ? html`<div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    <a class="button" href="/catalog/${offer._id}/edit">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>

                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    <!-- <a class="button" href="#">Like</a> -->

                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                    <!-- Bonus -->
                </div>` : null} 
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${offer.description}</p>
            </div>
        </section>`;

export async function detailsPge(ctx){
  const id = ctx.params.id;

  const offer = await getById(id);

  const userData = getUserData();

  if(userData && userData._id == offer._ownerId){
    offer.canEdit = true
  }

  ctx.render(detailsTemplate(offer, onDelete))

  async function onDelete(){
    const choice = confirm('Are you sure?');

    if(choice){
      await deleteOffer(id);
      ctx.page.redirect('/catalog');
    }
  }
}