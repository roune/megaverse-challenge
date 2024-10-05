import { API } from "./crossmint-api/API";
import axios from "axios";
import { Megaverse } from "./megaverse/Megaverse";
import { Polyanet } from "./megaverse/Polyanets";

const BASE_ENDPOINT = "https://challenge.crossmint.io/api/"
const CANDIDATE_ID = "54d89fe7-c130-43ab-a18e-3e6c669d8779";
const MEGAVERSE_BASE_SIZE = 11;
const CROSS_ARM_SIZE = 4;

const api = new API(CANDIDATE_ID, BASE_ENDPOINT, axios);
const megaverse = new Megaverse(MEGAVERSE_BASE_SIZE, api);

(async () => {
  await megaverse.generateCrossWithArmOfLength(CROSS_ARM_SIZE, Polyanet);
})();