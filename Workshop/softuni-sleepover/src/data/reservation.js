import { createPointer, encodeObject, endcodeDate, filterRelation } from "../util.js";
import { get } from "./api.js";

const endPoints = {
  'reservationsByRoomId': (roomId) => '/classes/Reservetion?where=' + encodeObject(filterRelation('room', 'Room', roomId)) + '&include=owner-',
  'reservations': '/classes/Reservetion'
};

export async function getByRoomId(roomId){
  const data = await get(endPoints.reservationsByRoomId(roomId))
  data.results.forEach(r => {
    r.startDate = new Date(e.startDate.iso);
    r.endDate = new Date(e.endDate.iso);
  })
  return data;
}

export async function create(roomData, userId){
  roomData = addOwner(roomData, userId);
  roomData.startDate = endcodeDate(roomData.startDate);
  roomData.endDate = endcodeDate(roomData.endDate);
  roomData.room = createPointer('Room', roomData.room);
  roomData.host = createPointer('_User', roomData.host);
  return post(endPoints.reservations, roomData);
}