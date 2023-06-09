import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes } from "../data/offers.js";

const catalogTemplate = (offers) => html`
        <section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            ${offers.length > 0 ? offers.map(shoeCard) : html`        
            <h2>There are no items added yet.</h2>`}
          </ul>
        </section>`;

const shoeCard = (shoe) => html`
  <li class="card">
    <img src=${shoe.imageUrl} alt="travis" />
    <p>
      <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
    </p>
    <p>
      <strong>Model: </strong
      ><span class="model">${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    <a class="details-btn" href="/catalog/${shoe._id}">Details</a>
  </li>`


export async function catalogPage(ctx) {
  const offers = await getAllShoes();
  ctx.render(catalogTemplate(offers));
}
