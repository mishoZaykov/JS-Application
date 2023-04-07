import { get, post, put, del } from "./api.js";

const endpoints = {
  posts: '/data/posts?sortBy=_createdOn%20desc',
  byId: '/data/posts/',
  byUserId: userId => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

export async function getAllPosts(){
  return get(endpoints.posts);
}

export async function getById(id){
  return get(endpoints.byId + id);
}

export async function createPost(data){
  return post(endpoints.posts, data);
}

export async function updatePost(id,data){
  return put(endpoints.byId + id, data);
}

export async function deletePost(id){
  return del(endpoints.byId + id)
}

export async function getUserPost(userId){
  return get(endpoints.byUserId(userId))
}

