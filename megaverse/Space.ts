import { MegaverseElement } from "./MegaverseElement";

export class Space implements MegaverseElement {
  saveInAPI(): Promise<void> {
    // Do nothing for Space elements
    return Promise.resolve();
  }
  deleteInAPI(): Promise<void> {
    return Promise.resolve();
  }
}