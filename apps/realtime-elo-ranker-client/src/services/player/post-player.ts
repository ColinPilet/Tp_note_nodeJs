import { eventEmitter } from "../event-emitter";

const URL = "/api/player";

/**
 * Post a player to create it.
 * 
 * @param {string} baseUrl The base URL of the API
 * @param {string} id The ID of the new player
 */
export async function postPlayer(baseUrl: string, name: string): Promise<Response> {
   const response = await fetch(baseUrl + URL, {
    method: "POST",
    body: JSON.stringify({
      id: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  eventEmitter.emit('playerPosted',name);
  
  return response;

}