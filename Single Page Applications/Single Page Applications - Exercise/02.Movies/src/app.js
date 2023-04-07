import { homePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { createPage } from "./create.js";
import { updateNav } from ".util.js";

const routes = {
  '/': homePage,
  '/login': loginPage,
  '/logout': logout,
  '/register': registerPage,
  '/create': createPage
};