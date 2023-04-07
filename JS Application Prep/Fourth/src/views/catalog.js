import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllOffers } from "../data/offers.js";

const catalogTemplate = (offers) => html`
  <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
   
            <ul class="other-books-list">
              ${offers.length > 0 ? offers.map(bookCard) : html`
              <p class="no-books">No books in database!</p>`}
            </ul>
        </section>`;

const bookCard = (offer) => html`
  <li class="otherBooks">
      <h3>${offer.title}</h3>
      <p>Type: ${offer.type}</p>
      <p class="img"><img src="${offer.imageUrl}"></p>
      <a class="button" href="/catalog/${offer._id}">Details</a>
  </li>
`;

export async function catalogPage(ctx){
  const offers = await getAllOffers();
  ctx.render(catalogTemplate(offers))
}