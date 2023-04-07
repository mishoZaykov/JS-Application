import * as authService from '../services/userService.js';

export const authMiddleware = (ctx, next) =>{
  ctx.user = authService.getUser();

  next()
}