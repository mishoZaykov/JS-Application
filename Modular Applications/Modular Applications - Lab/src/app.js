import page from "../node_modules/page/page.mjs";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { logoutView } from "./views/logoutView.js";

page(renderMiddleware);
page(authMiddleware);

page("/", homeView);
page("/login", loginView);
page('/logout', logoutView)

page.start();
