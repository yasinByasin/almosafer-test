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
      const paramsApi: GetFlightsParams = {
        origin: params?.origin || "MAD",
        oneWay: "false",
        nonStop: "false",
      }
      if (params?.departureDate) {
        paramsApi.departureDate = params.departureDate;
      }
      const url = `${this.apiBaseUrl}${this.endpoints.getFlights}`;
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(url, {
        params: paramsApi,
        headers
      });
      return response.data;

    } catch (error) {
      throw error;
    }
  }
}