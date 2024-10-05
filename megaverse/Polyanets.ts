import { API } from "../crossmint-api/API";
import { Coordinates } from "./Megaverse";
import { MegaverseElement } from "./MegaverseElement";

export class Polyanet implements MegaverseElement {
  async saveInAPI(api: API, coordinates: Coordinates): Promise<void> {
    await api.createPolyanet(coordinates);
  }

  async deleteInAPI(api: API, coordinates: Coordinates): Promise<void> {
    await api.deletePolyanet(coordinates);
  }
}