import { addOwner, encodeObject } from "../util.js";
import { get, post, put, del } from "./api.js";


const endPoints = {
  'rooms':()=> `/classes/Room?where=${encodeObject({openForBookins:true})}&include=owner`,
  'roomsWithUser':(userId)=> `/classes/Room?where=${encodeObject({$or:[{openForBookins:true},filterRelation('owner', '_User', userId)]})}&include=owner`,
  'roomById': "/classes/Room/",
};

export async function getAll(userId) {
  if(userId){
    return get(endPoints.roomsWithUser(userId))
  }else{
    return get(endPoints.rooms);
  }
}

export async function getById(id) {
  return get(endPoints.roomById + id);
}

export async function create(roomData, userId) {
  return post(endPoints.rooms, addOwner(roomData, userId));
}

export async function update(id, roomData, userId) {
  return put(endPoints.roomById + id, addOwner(roomData, userId));
}

export async function deleteById(id) {
  return del(endPoints.roomById + id);
}
