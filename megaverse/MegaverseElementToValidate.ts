import { Coordinates, Megaverse } from "./Megaverse";
import { MegaverseElement } from "./MegaverseElement";
import { Polyanet } from "./Polyanets";
import { Soloons } from "./Soloons";

export class MegaverseElementValidatyChecker {
  constructor(readonly element: MegaverseElement, readonly coordinates: Coordinates){}

  valid(megaverse: Megaverse): boolean {
    if (this.element instanceof Soloons) {
      const surroundingElements = megaverse.getSurroundingElements(this.coordinates);
      return surroundingElements.some((element) => element instanceof Polyanet);
    }
    return true;
  }
}