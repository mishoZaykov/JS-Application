import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateOffer } from "../data/offers.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (offer, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="brand"
                .value=${offer.brand}
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                .value=${offer.model}
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${offer.imageUrl}
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                .value=${offer.release}
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                .value=${offer.designer}
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                .value=${offer.value}
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx){
  const id  = ctx.params.id;

  const offer = await getById(id);

  ctx.render(editTemplate(offer, createSubmitHandler(onEdit)));

  async function onEdit({
    brand,
    model, 
    imageUrl, 
    release, 
    designer, 
    value
  }){
    if([brand, model, imageUrl, release, designer, value].some((f) => f == '')){
      return alert('All fields are required!');
    }

    await updateOffer(id,{
    brand,
    model, 
    imageUrl, 
    release, 
    designer, 
    value
    });

    ctx.page.redirect('/catalog/' + id);
  }
}