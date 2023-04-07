import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";

import { logout } from "./api/data.js";

import { homeView } from "./view/homeView.js";
import { loginView } from "./view/loginView.js";
import { registerView } from "./view/registerView.js";
import { browseView } from "./view/browseView.js";
import { editView } from "./view/editView.js";
import { myTeamView } from "./view/myTeamView.js";
import { teamDetailsView } from "./view/teamDetailsView.js";
import { createView } from "./view/createView.js";

const rootElement = document.getElementsByTagName("main")[0];

page("/", middleWare, homeView);
page("/index.html", middleWare, homeView);
page("/create", middleWare, createView);
page("/login", middleWare, loginView);
page("/register", middleWare, registerView);
page("/browse", middleWare, browseView);
page("/edit/:id", middleWare, editView);
page("/my-team", middleWare, myTeamView);
page("/details/:id", middleWare, teamDetailsView);

page.start();
updateNav();

function middleWare(ctx, next) {
  //ctx.render = (content) => render(content, rootElement);
  ctx.render = myRender;
  ctx.updateNav = updateNav;
  next();
}

document.querySelector('.action user logout').addEventListener('click', async(e)=>{
  e.preventDefault();
  await logout();

  updateNav()
  page.redirect('/');
})

function updateNav(){
  const UserData = JSON.parse(sessionStorage.getItem('userData'));
  if(UserData){
    document.querySelectorAll('.user').forEach(x=> x.style.display = 'block')
    document.querySelectorAll('.guest').forEach(x=> x.style.display = 'none')
  }else{
    document.querySelectorAll('.user').forEach(x=> x.style.display = 'none')
    document.querySelectorAll('.guest').forEach(x=> x.style.display = 'block')
  }
}

function myRender(content){
  render(content, rootElement)
}
