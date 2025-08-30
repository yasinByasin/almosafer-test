import React, { useState } from 'react';
import { GetFlightsParams } from '../types/flightsTypes';
import { useFlights } from '../hooks/useFlights';
import {
  FilterFormContainer,
  FilterFormTitle,
  FilterFormFields,
  FilterFormField,
  FilterFormLabel,
  FilterFormInput,
  AnimationButton,
} from './styledComponents';


interface FilterFormProps {
  onSearch: (params: GetFlightsParams & { departureDate?: string }) => void;
  isLoading?: boolean;
  className?: string;
  isVisible?: boolean;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  onSearch,
  isLoading = false,
  className,
  isVisible = false
}) => {
  const { setParams, params } = useFlights();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (params.origin.trim()) {
      onSearch({
        origin: params.origin.trim().toUpperCase(),
        departureDate: params.departureDate || undefined,
      });
    }
  };

  const handleInputChange = (field: keyof typeof params) => (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    setParams({
      ...params,
      [field]: typeof e === 'string' ? e : e.target.value
    });
  };

  const isFormValid = params.origin.trim().length > 0;

  if (!isVisible) return null;

  return (
    <FilterFormContainer className={className}>
      <FilterFormTitle>Find a Inspirations Flight</FilterFormTitle>

      <form onSubmit={handleSubmit}>
        <FilterFormFields>
          {/* Origin City Code Input */}
          <FilterFormField>
            <FilterFormLabel>
              From City *
            </FilterFormLabel>
            <FilterFormInput
              type="text"
              value={params.origin}
              onChange={handleInputChange('origin')}
              placeholder="NYC, LON, PAR..."
              maxLength={3}
              isOrigin
              required
              disabled={isLoading}
            />
          </FilterFormField>

          {/* Departure Date Input */}
          <FilterFormField>
            <FilterFormLabel>
              Departure Date
            </FilterFormLabel>
            <FilterFormInput
              type="date"
              value={params.departureDate}
              onChange={handleInputChange('departureDate')}
              min={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </FilterFormField>

          {/* Submit Button */}
          <FilterFormField>
            <AnimationButton
              type="submit"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  Searching...
                </>
              ) : (
                <>
                  Search
                </>
              )}
            </AnimationButton>
          </FilterFormField>
        </FilterFormFields>
      </form>
    </FilterFormContainer>
  );
};
