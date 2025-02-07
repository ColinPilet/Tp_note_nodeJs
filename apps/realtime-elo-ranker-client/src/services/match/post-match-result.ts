import { MatchResult } from "@realtime-elo-ranker/libs/ui";
import { eventEmitter } from "../event-emitter";

const URL = "/api/match";

/**
 * Post the result of a match.
 * 
 * @param {string} baseUrl The base URL of the API
 * @param {string} adversaryA The ID of the first adversary
 * @param {string} adversaryB The ID of the second adversary
 * @param {MatchResult} result The result of the match
 */
export default async function postMatchResult(baseUrl: string, adversaryA: string, adversaryB: string, result: MatchResult): Promise<Response> {
  const response = await fetch(baseUrl + URL, {
    method: "POST",
    body: JSON.stringify({
      winner: result === MatchResult.LEFT_WIN ? adversaryA : adversaryB,
      loser: result === MatchResult.LEFT_WIN ? adversaryB : adversaryA,
      draw: result === MatchResult.DRAW ? true : false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  eventEmitter.emit('matchPosted', { adversaryA, adversaryB, result });

  return response;
}