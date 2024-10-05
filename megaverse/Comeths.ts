import { API } from "../crossmint-api/API";
import { Coordinates } from "./Megaverse";
import { MegaverseElement } from "./MegaverseElement";

enum ComethDirection {
    UP = 'up',
    RIGHT = 'right',
    DOWN = 'down',
    LEFT = 'left'
}

export class Comeths implements MegaverseElement {
  constructor(public direction: ComethDirection) {}

  async saveInAPI(api: API, coordinates: Coordinates): Promise<void> {
    await api.createCometh(coordinates, this);
  }

  async deleteInAPI(api: API, coordinates: Coordinates): Promise<void> {
    await api.deleteCometh(coordinates);
  }

  static fromText(text: string): Comeths {
    const regex = /^(UP|RIGHT|DOWN|LEFT)_COMETH$/;
    if (!regex.test(text)) {
      throw new Error(`Invalid Cometh format: ${text}`);
    }
    const direction = text.split('_')[0].toLowerCase() as ComethDirection;
    return new Comeths(direction);
  }
}