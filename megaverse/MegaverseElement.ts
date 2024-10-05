import { API } from "../crossmint-api/API";
import { Coordinates } from "./Megaverse";

export interface MegaverseElement {
  saveInAPI(api: API, coordinates: Coordinates): Promise<void>;
  deleteInAPI(api: API, coordinates: Coordinates): Promise<void>;
}