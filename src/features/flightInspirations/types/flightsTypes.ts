export interface Column {
  label: string;
  key: string;
  render?: (row: FlightData, rowIndex: number, columnKey: string) => string | React.ReactNode;
}
export interface GetFlightsParams {
  origin: string;
  departureDate?: string;
  oneWay?: string;
  nonStop?: string;
}

export interface price {
  total: string
}

export interface Links {
  flightDates: string,
  flightOffers: string
}

export interface Location {
  subType: string,
  detailedName: string,
}
export interface FlightData {
  type: string,
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string,
  price: price,
  links: Links
}

export interface Dictionaries {
  currencies: {
    EUR: string
  }
  ,
  locations: {
    [key: string]: Location
  }
}

export interface Meta {
  currency: string,
  links: {
    self: string
  },
  defaults: {
    departureDate: string,
    oneWay: boolean,
    duration: string,
    nonStop: boolean,
    viewBy: string
  }
}

export interface Flights {
  data: FlightData[],
  dictionaries: Dictionaries,
  meta: Meta
}