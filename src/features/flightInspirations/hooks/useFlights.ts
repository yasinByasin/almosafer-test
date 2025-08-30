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
    departureDate: '2020-10-23',
  });

  const {
    isLoading,
    error,
    refetch: fetchFlights,
  } = useQuery({
    queryKey: flightsKeys.settings(),
    queryFn: async () => {
      let accessToken = await getCurrentToken!();

      try {
        const flightsData = await flightsApi.getFlights(accessToken, params);
        setFlightsData(flightsData.data);
        return flightsData;
      } catch (error: any) {
        if (error.response?.status === 401) {
          try {
            await getAuthToken!();
            accessToken = await getCurrentToken!();

            const flightsData = await flightsApi.getFlights(accessToken, params);
            setFlightsData(flightsData.data);
            return flightsData;
          } catch (retryError) {
            console.error('Retry after token refresh failed:', retryError);
            throw retryError;
          }
        }

        throw error;
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