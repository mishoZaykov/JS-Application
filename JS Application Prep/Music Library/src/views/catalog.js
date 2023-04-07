import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllOffers } from "../data/offers.js";

const catalogTemplate = (offers) => html`
    <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">

          ${offers.length > 0 ? offers.map(musicCard) : html`        
          <h2>There are no albums added yet.</h2>`}

        </ul>
      </section>`;

const musicCard = (card) => html`
  <li class="card">
    <img src=${card.imageUrl} alt="travis" />
    <p>
      <strong>Singer/Band: </strong><span class="singer">${card.singer}</span>
    </p>
    <p>
      <strong>Album name: </strong><span class="album">${card.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${card.sales}</span></p>
    <a class="details-btn" href="/catalog/${card._id}">Details</a>
  </li>`;

export async function catalogPage(ctx) {
  const offers = await getAllOffers();
  ctx.render(catalogTemplate(offers));
}