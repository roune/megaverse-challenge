import { Comeths } from "./Comeths";
import { Coordinates } from "./Megaverse";
import { MegaverseElement } from "./MegaverseElement";
import { Polyanet } from "./Polyanets";
import { Soloons } from "./Soloons";
import { Space } from "./Space";

export class MegaverseElementFactory {
  static createMegaverseElementFrom(text: string): MegaverseElement {
    if (text === "SPACE") {
      return new Space();
    } else if (text === "POLYANET") {
      return new Polyanet();
    } else if (text.endsWith("_COMETH")) {
      return Comeths.fromText(text);
    } else if (text.endsWith("_SOLOON")) {
      return Soloons.fromText(text);
    } else {
      throw new Error(`Unknown element type: ${text}`);
    }
  }
}