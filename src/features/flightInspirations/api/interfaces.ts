import { Flights, GetFlightsParams } from '../types/flightsTypes';

// Interface for the Flights API
export interface FlightsApiInterface {
  getFlights(accessToken: string, params?: GetFlightsParams): Promise<Flights>;
} 