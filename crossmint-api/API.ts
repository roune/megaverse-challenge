import axios from "axios";
import { Coordinates } from "../megaverse/Megaverse";
import { Soloons } from "../megaverse/Soloons";
import { Comeths } from "../megaverse/Comeths";

export class API {
  private lastRequestTime: number = 0;

  polyanetsEndpoint: string = "polyanets";
  soloonsEndpoint: string = "soloons";
  comethsEndpoint: string = "comeths";
  goalEndpoint: string = "map/[CANDIDATE_ID]/goal"
 
  constructor(
    private readonly candidateId: string,
    private readonly endpoint: string,
    private readonly axiosInstance: typeof axios
  ) {}

  private async controlledRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < 1000) {
      await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLastRequest));
    }
    this.lastRequestTime = Date.now();

    const maxRetries = 2;
    const baseDelay = 1000; // 1 second

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        if (attempt === maxRetries) {
          throw error; // Rethrow the error if we've exhausted all retries
        }
        const delay = baseDelay * (attempt + 1);
        console.log(`Request failed. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error("This should never be reached");
  }

  async createPolyanet(coordinates: Coordinates) {
    console.log(`Storing Polyanet at ${coordinates.row}:${coordinates.column} (row:column)`);
    return await this.controlledRequest(async () => 
      await this.axiosInstance.post(`${this.endpoint}/${this.polyanetsEndpoint}`, {
        candidateId: this.candidateId,
        row: coordinates.row,
        column: coordinates.column
      })
    );
  }

  async deletePolyanet(coordinates: Coordinates) {
    return await this.controlledRequest(async () => 
      await this.axiosInstance.delete(`${this.endpoint}/${this.polyanetsEndpoint}`, {
        data: {
          candidateId: this.candidateId,
          row: coordinates.row,
          column: coordinates.column
        }
      })
    );
  }

  // for challenge 2

  async getGoalMap(): Promise<string[][]> {
    const endpoint = `${this.endpoint}/${this.goalEndpoint.replace("[CANDIDATE_ID]", this.candidateId)}`;
    return (await this.axiosInstance.get(endpoint))['data']['goal']
  }

  async createSoloon(coordinates: Coordinates, soloon: Soloons) {
    console.log(`Storing Soloon at ${coordinates.row}:${coordinates.column} (row:column)`);
    return await this.controlledRequest(async () => 
      await this.axiosInstance.post(`${this.endpoint}/${this.soloonsEndpoint}`, {
        candidateId: this.candidateId,
        row: coordinates.row,
        column: coordinates.column,
        color: soloon.color
      })
    );
  }

  async deleteSoloon(coordinates: Coordinates) {
    return await this.controlledRequest(async () => 
      await this.axiosInstance.delete(`${this.endpoint}/${this.soloonsEndpoint}`, {
        data: {
          candidateId: this.candidateId,
          row: coordinates.row,
          column: coordinates.column
        }
      })
    );
  }

  async createCometh(coordinates: Coordinates, cometh: Comeths) {
    return await this.controlledRequest(async () => 
      await this.axiosInstance.post(`${this.endpoint}/${this.comethsEndpoint}`, {
        candidateId: this.candidateId,
        row: coordinates.row,
        column: coordinates.column,
        direction: cometh.direction
      })
    );
  }

  async deleteCometh(coordinates: Coordinates) {
    console.log(`Storing Cometh at ${coordinates.row}:${coordinates.column} (row:column)`);
    return await this.controlledRequest(async () => 
      await this.axiosInstance.delete(`${this.endpoint}/${this.comethsEndpoint}`, {
        data: {
          candidateId: this.candidateId,
          row: coordinates.row,
          column: coordinates.column
        }
      })
    );
  }
}