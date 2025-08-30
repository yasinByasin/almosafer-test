import { FLIGHTS_ENDPOINTS, flightsConfig } from "../config";
import { Flights, GetFlightsParams } from "../types/flightsTypes";
import { FlightsApiInterface } from "./interfaces";
import axios from "axios";

export class FlightsApi implements FlightsApiInterface {
  private apiBaseUrl: string;
  private endpoints: typeof FLIGHTS_ENDPOINTS;

  constructor(config: typeof flightsConfig) {
    this.apiBaseUrl = config.apiBaseUrl;
    this.endpoints = config.apiEndpoints;
  }

  async getFlights(accessToken: string, params?: GetFlightsParams): Promise<Flights> {
    try {
      const paramsApi = {
        origin: params?.origin || "MAD",
        departureDate: params?.departureDate || "2020-10-23",
        oneWay: "false",
        nonStop: "false",
      }
      // The API should implement pagination in order to prevent performance issues
      const queryParams = new URLSearchParams(paramsApi);
      const url = `${this.apiBaseUrl}${this.endpoints.getFlights}?${queryParams}`;
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(url, {
        params,
        headers
      });
      return response.data;

    } catch (error) {
      throw error;
    }
  }
}