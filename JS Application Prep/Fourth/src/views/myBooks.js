import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";
import { getUserBooks } from "../data/offers.js";

const myBooksTemplate = (offers) => html`
  <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            <ul class="my-books-list">
             ${offers.length > 0 ? offers.map(myBooks) : html`
             <p class="no-books">No books in database!</p>`}
            </ul>

        </section>`;

const myBooks = (book) => html`  
<li class="otherBooks">
  <h3>${book.title}</h3>
  <p>Type: ${book.type}</p>
  <p class="img"><img src="${book.imageUrl}"></p>
  <a class="button" href="/catalog/${book._id}">Details</a>
</li>`;



export async function myBooksPage(ctx){
  
  const userData = getUserData()
  const id = userData._id
  const offers = await getUserBooks(id);

  ctx.render(myBooksTemplate(offers))

}