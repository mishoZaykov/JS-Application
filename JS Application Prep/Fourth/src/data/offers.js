import { get, post, put, del } from "./api.js";

const endpoints = {
  catalog: '/data/books?sortBy=_createdOn%20desc',
  byId: '/data/books/',
  byUserId: userId => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

export async function getAllOffers(){
  return get(endpoints.catalog);
}

export async function getById(id){
  return get(endpoints.byId + id);
}

export async function createOffer(data){
  return post(endpoints.catalog, data)
}

export async function updateOffer(id, data){
  return put(endpoints.byId + id, data);
}

export async function deleteOffer(id){
  return del(endpoints.byId + id)
}

export async function getUserBooks(userId){
  return get(endpoints.byUserId(userId))
}