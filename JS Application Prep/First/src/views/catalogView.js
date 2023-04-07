import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import * as albumSerivce from '../services/albumService.js'

const albumDetails = (albumId) => html`
                    <div class="btn-group">
                        <a href="/albums/${albumId}" id="details">Details</a>
                    </div>
`

const albumTemplate = (album, withDetail = true) => html`
            <div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: ${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    ${withDetail 
                      ? albumDetails(album._id)
                      : nothing
                    }

                </div>
            </div>
`

const catalogTemplate = (albums, user) => html`
 <section id="catalogPage">
            <h1>All Albums</h1>

            ${albums.map(x => albumTemplate(x, Boolean(user)))}

            ${albums.length == 0
              ? html`<p>No Albums in Catalog!</p>`
              : nothing
            }
        </section>
`

export const catalogView = (ctx) =>{
  albumSerivce.getAll()
    .then(albums => {
      ctx.render(catalogTemplate(albums, ctx.user))
    })
}