import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FlightData, GetFlightsParams } from '../types/flightsTypes';
import debounce from 'lodash/debounce';
import { flightsConfig } from '../config';
import { FlightsApi } from '../api/flightsApi';
import { useAuth } from '../../auth/hooks/useAuth';
import { useAuthStore } from '../../auth/store/store';

// Query keys for caching
export const flightsKeys = {
  all: ['flights'] as const,
  settings: () => [...flightsKeys.all, 'settings'] as const,
};

export const useFlights = () => {
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const flightsApi = useMemo(() => new FlightsApi(flightsConfig), []);
  const { getCurrentToken } = useAuth();
  const { getAuthToken } = useAuthStore();
  const [flightsData, setFlightsData] = useState<FlightData[]>([]);
  const [params, setParams] = useState<GetFlightsParams>({
    origin: 'MAD',
    departureDate: new Date().toISOString().split('T')[0].replace(/-/g, '-'),
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    error,
    refetch: fetchFlights,
  } = useQuery({
    queryKey: flightsKeys.settings(),
    queryFn: async () => {
      let accessToken = await getCurrentToken!();
      setIsLoading(true);

      params.departureDate = params.departureDate?.toString().split('T')[0].replace(/-/g, '-');
      try {
        const flightsData = await flightsApi.getFlights(accessToken, params);
        setFlightsData(flightsData.data);
        setIsLoading(false);
        return flightsData;
      } catch (error: any) {
        if (error.response?.status === 401) {
          try {
            await getAuthToken!();
            accessToken = await getCurrentToken!();

            const flightsData = await flightsApi.getFlights(accessToken, params);
            setFlightsData(flightsData.data);
            setIsLoading(false);
            return flightsData;
          } catch (retryError) {
            setIsLoading(false);
            console.error('Retry after token refresh failed:', retryError);
            throw retryError;
          }
        } else if (error.response?.status === 404) {
          setIsLoading(false);
          throw new Error('No flights found');
        }

        setIsLoading(false);
        throw new Error('Error fetching flights');
      }
    },
    enabled: false,
  });

  const saveChanges = () => {
    setEditedCells(new Set());
  };

  const updateCell = (rowIndex: number, columnId: string, value: string) => {
    const newData = [...flightsData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnId]: value,
    };
    setFlightsData(newData);
    setEditedCells(new Set(editedCells).add(`${rowIndex}-${columnId}`));
  };


  return {
    fetchFlights,
    editedCells,
    updateCell,
    saveChanges,
    isLoading,
    error,
    flightsData,
    params,
    setParams,
  };
};