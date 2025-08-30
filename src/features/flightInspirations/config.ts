// API endpoints
export const FLIGHTS_ENDPOINTS = {
  getFlights: 'shopping/flight-destinations',
} as const;


export const flightsConfig = {
  apiBaseUrl: "https://test.api.amadeus.com/v1/",
  apiEndpoints: FLIGHTS_ENDPOINTS,
};