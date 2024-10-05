import { API } from "./crossmint-api/API";
import axios from "axios";
import { Megaverse } from "./megaverse/Megaverse";

const BASE_ENDPOINT = "https://challenge.crossmint.io/api/"
const CANDIDATE_ID = "54d89fe7-c130-43ab-a18e-3e6c669d8779";

const api = new API(CANDIDATE_ID, BASE_ENDPOINT, axios);
(async () => {
  await Megaverse.fromGoalJSON(api);
})();