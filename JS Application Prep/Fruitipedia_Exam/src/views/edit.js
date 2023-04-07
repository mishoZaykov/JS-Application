import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updatePost } from "../data/fruits.js";
import { createSubmitHandler } from "../util.js";

const editTempalate = (fruit, onEdit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Fruit</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input type="text" name="name" id="name" .value=${fruit.name} placeholder="Fruit Name" />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        .value=${fruit.imageUrl}
        placeholder="Fruit Image URL"
      />
      <textarea
        id="fruit-description"
        name="description"
        .value=${fruit.description}
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        .value=${fruit.nutrition}
        placeholder="Nutrition"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editPage(ctx){
  const id = ctx.params.id;

  const fruit = await getById(id);

  ctx.render(editTempalate(fruit, createSubmitHandler(onEdit)));

  async function onEdit({
    name,
    imageUrl, 
    description, 
    nutrition
  }){
    if([name,
      imageUrl, 
      description, 
      nutrition].some(f => f == '')){
        return alert('All fields are required!');
      }

      await updatePost(id,{
        name,
        imageUrl, 
        description, 
        nutrition
      });

      ctx.page.redirect('/catalog/' + id);
  }
}
