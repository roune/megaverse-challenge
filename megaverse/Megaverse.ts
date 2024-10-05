import { API } from "../crossmint-api/API";
import { MegaverseElement } from "./MegaverseElement";
import { MegaverseElementFactory } from "./MegaverseElementFactory";
import { MegaverseElementValidatyChecker } from "./MegaverseElementToValidate";
import { Space } from "./Space";

export interface Coordinates {
  row: number,
  column: number
}

export class ArmLengthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArmLengthError';
  }
}

export class InvalidMegaverse extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArmLengthError';
  }
}

export class Megaverse {
  private grid: (MegaverseElement)[][];
  private pendingValidations: MegaverseElementValidatyChecker[];

  constructor(size: number, readonly api: API) {
    this.grid = Array(size).fill(null).map(() => 
      Array(size).fill(null).map(() => new Space())
    );
    this.pendingValidations = [];
  }

  async generateCrossWithArmOfLength(armLength: number, ElementClass: new () => MegaverseElement) {
    if (this.grid.length < armLength * 2) {
      throw new ArmLengthError("Size of the cross is too large")
    }
    const center = Math.floor(this.grid.length / 2);
    
    for (let i = -armLength + 1; i < armLength; i++) {
      if (i === 0) continue; // Skip the center as it's not part of the arm length
      
      // Main diagonal (top-left to bottom-right)
      if (center + i >= 0 && center + i < this.grid.length) {
        await this.fillBoxWithValue(new ElementClass(), { row: center + i, column: center + i });
      }
      
      // Anti-diagonal (top-right to bottom-left)
      if (center + i >= 0 && center + i < this.grid.length) {
        await this.fillBoxWithValue(new ElementClass(), { row: center + i, column: center - i });
      }
    }

    // Always fill the center
    await this.fillBoxWithValue(new ElementClass(), { row: center, column: center });

    // Fill additional center cell for even-sized grids
    if (this.grid.length % 2 === 0) {
      await this.fillBoxWithValue(new ElementClass(), { row: center - 1, column: center - 1 });
    }
  }

  private async fillBoxWithValue(element: MegaverseElement, coordinates: Coordinates, validateFirst?: boolean) {
    this.grid[coordinates.row][coordinates.column] = element;
    if (validateFirst) {
      this.pendingValidations.push(new MegaverseElementValidatyChecker(element, coordinates))
    } else {
      await element.saveInAPI(this.api, coordinates);
    }
  }

  // for challenge 2

  static async fromGoalJSON(api: API): Promise<Megaverse> {
    const goalMap = await api.getGoalMap();
    const megaverse = new Megaverse(goalMap.length, api);
    await megaverse.generateMegaverse(goalMap);
    return megaverse;
  }

  private async generateMegaverse(goalJSON: string[][]) {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const coordinates = { row, column: col } as Coordinates;
        const element = MegaverseElementFactory.createMegaverseElementFrom(goalJSON[row][col]);
        await this.fillBoxWithValue(element, coordinates, true)
      }
    }

    if (this.pendingValidations.some((pendingValidation) => !pendingValidation.valid(this))) {
      throw new InvalidMegaverse("This megaverse is invalid, try again");
    }
    for (const pendingValidation of this.pendingValidations) {
      // to prevent from doing all the requests in parallel, and overwhelming the backend
      await pendingValidation.element.saveInAPI(this.api, pendingValidation.coordinates);
    }
  }

  getSurroundingElements(coordinates: Coordinates): MegaverseElement[] {
    const { row, column } = coordinates;
    const surroundingElements: MegaverseElement[] = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // Skip the center element

        const newRow = row + i;
        const newColumn = column + j;

        if (
          newRow >= 0 &&
          newRow < this.grid.length &&
          newColumn >= 0 &&
          newColumn < this.grid[newRow].length
        ) {
          surroundingElements.push(this.grid[newRow][newColumn]);
        }
      }
    }

    return surroundingElements;
  }
}
