import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteGame, getById } from "../data/games.js";
import { getUserData } from "../util.js";

const detailsTemplate = (game, onDelete) => html` 
<section id="game-details">
  <h1>Game Details</h1>
  <div class="info-section">
    <div class="game-header">
      <img class="game-img" src="${game.imageUrl}" />
      <h1>${game.title}</h1>
      <span class="levels">MaxLevel: ${game.maxLevel}</span>
      <p class="type">${game.category}</p>
    </div>

    <p class="text">
      ${game.summary}
    </p>

    ${game.canEdit ? html`
     <div class="buttons">
      <a href="/catalog/${game._id}/edit" class="button">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
    </div>` : null}

  </div>
</section>`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const game = await getById(id);

  const userData = getUserData();

  if (userData && userData._id == game._ownerId) {
    game.canEdit = true;
  }

  ctx.render(detailsTemplate(game, onDelete));

  async function onDelete() {
    const choice = confirm("Are you sure?");

    if (choice) {
      await deleteGame(id);
      ctx.page.redirect("/");
    }
  }
}
