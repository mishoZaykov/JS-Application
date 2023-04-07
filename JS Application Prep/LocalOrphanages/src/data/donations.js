import { get, post } from "./api.js";

const endpoints = {
  donations: '/data/donations',
  byPostId: postId => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
  byPostIdandUserId: (postId, userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function donate(postId){
  return post(endpoints.donations, {postId});
}

export async function getDonations(postId){
  return get(endpoints.byPostId(postId));
}

export async function getUserDonation(postId, userId){
  return get(endpoints.byPostIdandUserId(postId, userId));
}