import * as userService from "../services/authService.js";


export const logoutView = (ctx) => {
  userService.logout()
    .then(() =>{
      ctx.page.redirect('/')
    })
}