import { get, post, put, del } from "./api.js";

const endpoints = {
  posts: '/data/fruits?sortBy=_createdOn%20desc',
  byId: '/data/fruits/',
  search: query => `/data/fruits?where=name%20LIKE%20%22${query}%22`
}

export async function getAllPosts(){
  return get(endpoints.posts)
}

export async function getById(id){
  return get(endpoints.byId + id);
}

export async function createPost(data){
  return post(endpoints.posts, data)
}

export async function updatePost(id,data){
  return put(endpoints.byId + id,data);
}

export async function deletePost(id){
  return del(endpoints.byId + id);
}

export async function searchFruit(query){
  return get(endpoints.search(query))
}