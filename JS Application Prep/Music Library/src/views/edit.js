import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateOffer } from "../data/offers.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (offer, onEdit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Album</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input
        type="text"
        name="singer"
        .value=${offer.singer}
        id="album-singer"
        placeholder="Singer/Band"
      />
      <input type="text" name="album"  .value=${offer.album} id="album-album" placeholder="Album" />
      <input
        type="text"
        name="imageUrl"
        .value=${offer.imageUrl}
        id="album-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        .value=${offer.release}
        id="album-release"
        placeholder="Release date"
      />
      <input type="text" name="label" .value=${offer.label} id="album-label" placeholder="Label" />
      <input type="text" name="sales" .value=${offer.sales} id="album-sales" placeholder="Sales" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editPage(ctx){
  const id = ctx.params.id;

  const offer = await getById(id);

  ctx.render(editTemplate(offer, createSubmitHandler(onEdit)));

  async function onEdit({
    singer,
    album, 
    imageUrl, 
    release, 
    label, 
    sales  
  }){
    if([singer, album, imageUrl, release, label, sales].some((f) => f == '')){
      return alert ('All fields are required!');
    }

    await updateOffer(id,{
      singer,
      album, 
      imageUrl, 
      release, 
      label, 
      sales 
    });

    ctx.page.redirect('/catalog/' + id);
  }
}
