import { get, post, put, del } from "./api.js";

const endpoints = {
  games: '/data/games?sortBy=_createdOn%20desc',
  byId: '/data/games/',
  recentGames: '/data/games?sortBy=_createdOn%20desc&distinct=category'
}

export async function getAllGames(){
  return get(endpoints.games);
}

export async function getRecentGames(){
  return get(endpoints.recentGames);
}

export async function getById(id){
  return get(endpoints.byId + id)
}

export async function createGame(data){
  return post(endpoints.games, data);
}

export async function updateGame(id, data){
  return put(endpoints.byId + id, data)
}

export async function deleteGame(id){
  return del(endpoints.byId + id);
}