import { API } from "../crossmint-api/API";
import { Coordinates } from "./Megaverse";
import { MegaverseElement } from "./MegaverseElement";

enum SoloonColor {
  BLUE = 'blue',
  RED = 'red',
  PURPLE = 'purple',
  WHITE = 'white'
}


export class Soloons implements MegaverseElement {
  constructor(public color: SoloonColor) {}

  async saveInAPI(api: API, coordinates: Coordinates): Promise<void> {
    await api.createSoloon(coordinates, this);
  }
  async deleteInAPI(api: API, coordinates: Coordinates): Promise<void> {
    await api.deleteSoloon(coordinates);
  }

  static fromText(text: string): Soloons {
    const regex = /^(BLUE|RED|PURPLE|WHITE)_SOLOON$/;
    if (!regex.test(text)) {
      throw new Error(`Invalid Soloon format: ${text}`);
    }
    const color = text.split('_')[0].toLowerCase() as SoloonColor;
    return new Soloons(color);
  }
}